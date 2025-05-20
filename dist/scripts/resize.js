import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

async function resizeImages() {
  const images = uploadedImages.resize;
  if (images.length === 0) {
    alert(translations[document.documentElement.lang].noImageSelected);
    return;
  }

  const resizeType = document.querySelector('input[name="resizeType"]:checked').value;
  let width, height, percent;

  if (resizeType === 'pixels') {
    width = parseInt(document.getElementById('width').value);
    height = parseInt(document.getElementById('height').value);
    if (isNaN(width) || isNaN(height) || width < 1 || height < 1) {
      alert(translations[document.documentElement.lang].invalidDimensions);
      return;
    }
  } else {
    percent = parseInt(document.getElementById('percent').value);
    if (isNaN(percent) || percent < 1) {
      alert(translations[document.documentElement.lang].invalidPercent);
      return;
    }
  }

  const output = document.getElementById('resizeOutput');
  output.innerHTML = translations[document.documentElement.lang].processing;

  let outputContent = '';

  for (const img of images) {
    const image = new Image();
    image.src = img.url;
    await new Promise((resolve) => { image.onload = resolve; });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (resizeType === 'pixels') {
      canvas.width = width;
      canvas.height = height;
    } else {
      canvas.width = image.width * (percent / 100);
      canvas.height = image.height * (percent / 100);
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    });

    const url = URL.createObjectURL(blob);
    outputContent += `
      <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
        <img src="${url}" alt="Resized Image" class="max-w-full h-auto">
        <div class="image-info mt-2">
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${img.file.name}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(blob.size)}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageDimensions}${canvas.width} × ${canvas.height} px</p>
        </div>
        <a href="${url}" download="${img.file.name}" class="text-blue-700 hover:underline mt-2 inline-block">
          ${translations[document.documentElement.lang].download}
        </a>
      </div>
    `;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllResize').classList.remove('hidden');
}

document.querySelectorAll('input[name="resizeType"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    document.getElementById('pixelInputs').classList.toggle('hidden', e.target.value !== 'pixels');
    document.getElementById('percentInput').classList.toggle('hidden', e.target.value !== 'percent');
  });
});

export { resizeImages };