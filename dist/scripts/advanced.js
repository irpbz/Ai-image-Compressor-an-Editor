// dist/scripts/advanced.js
import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

async function applyAdvancedEdit() {
  const images = uploadedImages.advanced;
  const lang = document.documentElement.lang || 'en';
  if (images.length === 0) {
    alert(translations[lang].noImageSelected);
    return;
  }

  const watermarkType = document.querySelector('input[name="watermarkType"]:checked')?.value;
  if (!watermarkType) {
    alert(translations[lang].selectWatermarkType);
    return;
  }

  let watermarkText = '', watermarkImage = null, font = 'Vazir', fontSize = 30;
  if (watermarkType === 'text') {
    watermarkText = document.getElementById('watermarkText').value;
    if (!watermarkText) {
      alert(translations[lang].noWatermarkText);
      return;
    }
    font = document.getElementById('watermarkFont').value || 'Vazir';
    fontSize = parseInt(document.getElementById('watermarkFontSize').value) || 30;
    if (isNaN(fontSize) || fontSize < 10) {
      alert(translations[lang].invalidFontSize);
      return;
    }
  } else if (watermarkType === 'image') {
    watermarkImage = document.getElementById('watermarkImage').files[0];
    if (!watermarkImage) {
      alert(translations[lang].noWatermarkImage);
      return;
    }
  }

  const opacity = parseFloat(document.getElementById('watermarkOpacity').value) || 0.7;
  if (isNaN(opacity) || opacity < 0 || opacity > 1) {
    alert(translations[lang].invalidOpacity);
    return;
  }

  const position = document.getElementById('watermarkPosition').value || 'center';
  const color = document.getElementById('watermarkColor').value || '#ffffff';
  const scale = watermarkType === 'image' ? (parseInt(document.getElementById('watermarkScale').value) || 50) / 100 : 1;

  const brightness = (parseInt(document.getElementById('brightness').value) || 100) / 100;
  const contrast = (parseInt(document.getElementById('contrast').value) || 100) / 100;
  const saturation = (parseInt(document.getElementById('saturation').value) || 100) / 100;
  const blur = parseInt(document.getElementById('blur').value) || 0;
  const sepia = (parseInt(document.getElementById('sepia').value) || 0) / 100;
  const grayscale = document.getElementById('grayscale').checked || false;
  const vignette = (parseInt(document.getElementById('vignette').value) || 0) / 100;
  const rotation = parseInt(document.getElementById('rotation').value) || 0;
  const flipHorizontal = document.getElementById('flipHorizontal').checked || false;
  const flipVertical = document.getElementById('flipVertical').checked || false;

  const output = document.getElementById('advancedOutput');
  output.innerHTML = translations[lang].processing;

  let outputContent = '';

  try {
    console.log('Attempting to initialize Web Worker');
    const worker = new Worker(new URL('./advancedWorker.js', import.meta.url), { type: 'module' });
    console.log('Worker initialized successfully');

    for (const img of images) {
      const image = new Image();
      image.src = img.url;
      image.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        image.onload = () => {
          console.log(`Image loaded: ${img.file.name}`);
          resolve();
        };
        image.onerror = () => {
          console.error(`Failed to load image: ${img.file.name}`);
          outputContent += `<p class="text-red-500">${translations[lang].error} ${img.file.name}</p>`;
          resolve();
        };
      });

      const dimensions = `${image.width} × ${image.height} px`;

      const result = await new Promise((resolve, reject) => {
        console.log(`Sending data to worker for ${img.file.name}`);
        worker.postMessage({
          image: img.file,
          watermarkType,
          watermarkText,
          watermarkImage,
          font,
          fontSize,
          opacity,
          position,
          color,
          scale,
          brightness,
          contrast,
          saturation,
          blur,
          sepia,
          grayscale,
          vignette,
          rotation,
          flipHorizontal,
          flipVertical
        });

        worker.onmessage = (e) => {
          if (e.data.error) {
            console.error(`Worker error for ${img.file.name}:`, e.data.error);
            reject(new Error(e.data.error));
          } else {
            console.log(`Received result from worker for ${img.file.name}`);
            resolve(e.data);
          }
        };

        worker.onerror = (err) => {
          console.error('Worker execution error:', err);
          reject(err);
        };
      });

      if (!result) {
        console.error(`No result for ${img.file.name}`);
        outputContent += `<p class="text-red-500">${translations[lang].workerError}</p>`;
        continue;
      }

      const url = URL.createObjectURL(result);
      outputContent += `
        <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <img src="${url}" alt="Edited Image" class="max-w-full h-auto">
          <div class="image-info mt-2">
            <p class="text-gray-700 dark:text-gray-300">${translations[lang].imageName} ${img.file.name}</p>
            <p class="text-gray-700 dark:text-gray-300">${translations[lang].imageSize} ${formatFileSize(result.size)}</p>
            <p class="text-gray-700 dark:text-gray-300">${translations[lang].imageDimensions} ${dimensions}</p>
          </div>
          <a href="${url}" download="${img.file.name}" class="text-blue-700 hover:underline mt-2 inline-block">
            ${translations[lang].download}
          </a>
        </div>
      `;
    }

    worker.terminate();
    console.log('Worker terminated');
  } catch (err) {
    console.error('Failed to process advanced edit:', err);
    outputContent += `<p class="text-red-500">${translations[lang].error}: ${err.message}</p>`;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllAdvanced')?.classList.remove('hidden');
}

async function applyAdvancedFilters() {
  const images = uploadedImages.advanced;
  const lang = document.documentElement.lang || 'en';
  if (images.length === 0) {
    alert(translations[lang].noImageSelected);
    return;
  }

  const filterType = document.getElementById('filterType').value;
  const filterIntensity = parseFloat(document.getElementById('filterIntensity').value) || 0.5;

  const output = document.getElementById('advancedOutput');
  output.innerHTML = translations[lang].processing;

  let outputContent = '';

  try {
    if (!window.WebGLRenderingContext) {
      throw new Error('WebGL is not supported in this browser.');
    }

    let fxCanvas;
    try {
      fxCanvas = fx.canvas();
    } catch (err) {
      throw new Error('Failed to initialize glfx: ' + err.message);
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    for (const img of images) {
      const image = new Image();
      image.src = img.url;
      image.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('Failed to load image: ' + img.file.name));
      });

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const texture = fxCanvas.texture(canvas);
      fxCanvas.draw(texture);

      switch (filterType) {
        case 'vintage':
          fxCanvas.sepia(filterIntensity).brightnessContrast(0.1, 0.2);
          break;
        case 'hdr':
          fxCanvas.brightnessContrast(0.15, 0.3).sharpen(filterIntensity * 10);
          break;
        case 'cartoon':
          fxCanvas.ink(filterIntensity).edgeWork(10);
          break;
        default:
          throw new Error('Invalid filter type: ' + filterType);
      }

      fxCanvas.update();
      ctx.drawImage(fxCanvas, 0, 0);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const url = URL.createObjectURL(blob);

      outputContent += `
        <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <img src="${url}" alt="Filtered Image" class="max-w-full h-auto">
          <div class="image-info mt-2">
            <p class="text-gray-700 dark:text-gray-300">${translations[lang].imageName} ${img.file.name}</p>
            <p class="text-gray-700 dark:text-gray-300">${translations[lang].imageSize} ${formatFileSize(blob.size)}</p>
            <p class="text-gray-700 dark:text-gray-300">${translations[lang].imageDimensions} ${image.width} × ${image.height} px</p>
          </div>
          <a href="${url}" download="${img.file.name}" class="text-blue-700 hover:underline mt-2 inline-block">${translations[lang].download}</a>
        </div>
      `;
    }

    fxCanvas?.delete();
  } catch (err) {
    console.error('Error in applying filters:', err);
    outputContent += `<p class="text-red-500">${translations[lang].error}: ${err.message}</p>`;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllAdvanced')?.classList.remove('hidden');
}

// Event listeners
document.getElementById('watermarkFont')?.addEventListener('change', (e) => {
  const customFontUpload = document.getElementById('customFontUpload');
  if (customFontUpload) {
    customFontUpload.classList.toggle('hidden', e.target.value !== 'custom');
  }
});

document.querySelectorAll('input[name="watermarkType"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const textSettings = document.getElementById('textWatermarkSettings');
    const imageSettings = document.getElementById('imageWatermarkSettings');
    if (textSettings && imageSettings) {
      textSettings.classList.toggle('hidden', e.target.value !== 'text');
      imageSettings.classList.toggle('hidden', e.target.value !== 'image');
    }
  });
});

document.getElementById('applyFilters')?.addEventListener('click', applyAdvancedFilters);

export { applyAdvancedEdit, applyAdvancedFilters };