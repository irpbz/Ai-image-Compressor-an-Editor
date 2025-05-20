import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

async function removeBackground() {
  const images = uploadedImages.bgRemove;
  if (images.length === 0) {
    alert(translations[document.documentElement.lang].noImageSelected);
    return;
  }

  const bgColor = document.getElementById('bgColor').value;
  const tolerance = parseInt(document.getElementById('bgTolerance').value);
  if (isNaN(tolerance) || tolerance < 0 || tolerance > 100) {
    alert(translations[document.documentElement.lang].invalidTolerance);
    return;
  }

  const output = document.getElementById('bgRemoveOutput');
  output.innerHTML = translations[document.documentElement.lang].processing;

  let outputContent = '';

  for (const img of images) {
    const image = new Image();
    image.src = img.url;
    await new Promise((resolve) => { image.onload = resolve; });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const bgColorRgb = hexToRgb(bgColor);
    const toleranceSquared = tolerance * tolerance;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const distance = (r - bgColorRgb.r) ** 2 + (g - bgColorRgb.g) ** 2 + (b - bgColorRgb.b) ** 2;
      if (distance < toleranceSquared) {
        data[i + 3] = 0; // Make pixel transparent
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png', 0.8);
    });

    const url = URL.createObjectURL(blob);
    const dimensions = `${canvas.width} × ${canvas.height} px`;
    outputContent += `
      <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
        <img src="${url}" alt="Background Removed Image" class="max-w-full h-auto">
        <div class="image-info mt-2">
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${img.file.name}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(blob.size)}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageDimensions}${dimensions}</p>
        </div>
        <a href="${url}" download="${img.file.name}" class="text-blue-700 hover:underline mt-2 inline-block">
          ${translations[document.documentElement.lang].download}
        </a>
      </div>
    `;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllBgRemove').classList.remove('hidden');
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export { removeBackground };