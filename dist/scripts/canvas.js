import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

async function changeCanvasSize() {
  const images = uploadedImages.canvas;
  if (images.length === 0) {
    alert(translations[document.documentElement.lang].noImageSelected);
    return;
  }

  const canvasWidth = parseInt(document.getElementById('canvasWidth').value);
  const canvasHeight = parseInt(document.getElementById('canvasHeight').value);
  const canvasColor = document.getElementById('canvasColor').value;

  if (isNaN(canvasWidth) || isNaN(canvasHeight) || canvasWidth < 1 || canvasHeight < 1) {
    alert(translations[document.documentElement.lang].invalidDimensions);
    return;
  }

  const output = document.getElementById('canvasOutput');
  output.innerHTML = translations[document.documentElement.lang].processing;

  let outputContent = '';

  for (const img of images) {
    const image = new Image();
    image.src = img.url;
    await new Promise((resolve) => { image.onload = resolve; });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const offsetX = (canvasWidth - image.width) / 2;
    const offsetY = (canvasHeight - image.height) / 2;
    ctx.drawImage(image, offsetX, offsetY);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    });

    const url = URL.createObjectURL(blob);
    outputContent += `
      <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
        <img src="${url}" alt="Canvas Image" class="max-w-full h-auto">
        <div class="image-info mt-2">
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${img.file.name}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(blob.size)}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageDimensions}${canvasWidth} × ${canvasHeight} px</p>
        </div>
        <a href="${url}" download="${img.file.name}" class="text-blue-700 hover:underline mt-2 inline-block">
          ${translations[document.documentElement.lang].download}
        </a>
      </div>
    `;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllCanvas').classList.remove('hidden');
}

export { changeCanvasSize };