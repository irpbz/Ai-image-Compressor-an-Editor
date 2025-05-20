import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

async function convertImages() {
  const images = uploadedImages.convert;
  if (images.length === 0) {
    alert(translations[document.documentElement.lang].noImageSelected);
    return;
  }

  const format = document.getElementById('convertFormat').value;
  const quality = parseFloat(document.getElementById('convertQuality').value);
  if (isNaN(quality) || quality < 0.1 || quality > 1) {
    alert(translations[document.documentElement.lang].invalidQuality);
    return;
  }

  const output = document.getElementById('convertOutput');
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

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, `image/${format}`, quality);
    });

    if (!blob) {
      outputContent += `<p class="text-red-500">${translations[document.documentElement.lang].convertError}</p>`;
      continue;
    }

    const url = URL.createObjectURL(blob);
    const dimensions = `${canvas.width} × ${canvas.height} px`;
    outputContent += `
      <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
        <img src="${url}" alt="Converted Image" class="max-w-full h-auto">
        <div class="image-info mt-2">
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${img.file.name}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(blob.size)}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageDimensions}${dimensions}</p>
        </div>
        <a href="${url}" download="${img.file.name.replace(/\.[^/.]+$/, '')}.${format}" class="text-blue-700 hover:underline mt-2 inline-block">
          ${translations[document.documentElement.lang].download}
        </a>
      </div>
    `;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllConvert').classList.remove('hidden');
}

export { convertImages };