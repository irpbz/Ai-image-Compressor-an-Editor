import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

async function compressImages() {
  const images = uploadedImages.compress;
  if (images.length === 0) {
    alert(translations[document.documentElement.lang].noImageSelected);
    return;
  }

  const quality = parseFloat(document.getElementById('quality').value);
  if (isNaN(quality) || quality < 0.1 || quality > 1) {
    alert(translations[document.documentElement.lang].invalidQuality);
    return;
  }

  const format = document.getElementById('format').value;
  const output = document.getElementById('compressOutput');
  output.innerHTML = translations[document.documentElement.lang].processing;

  let outputContent = '';

  for (let i = 0; i < images.length; i++) {
    const originalSize = images[i].file.size;
    const compressedFile = await new Promise((resolve) => {
      new Compressor(images[i].file, {
        quality,
        mimeType: `image/${format}`,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.error(err);
          resolve(null);
        }
      });
    });

    if (!compressedFile) {
      outputContent += `<p class="text-red-500">${translations[document.documentElement.lang].workerError}</p>`;
      continue;
    }

    const compressedSize = compressedFile.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    const url = URL.createObjectURL(compressedFile);
    outputContent += `
      <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
        <img src="${url}" alt="Compressed Image" class="max-w-full h-auto">
        <div class="image-info mt-2">
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${compressedFile.name}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(compressedSize)}</p>
          <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].compressionRatio}${compressionRatio}%</p>
        </div>
        <a href="${url}" download="${compressedFile.name}" class="text-blue-700 hover:underline mt-2 inline-block">
          ${translations[document.documentElement.lang].download}
        </a>
      </div>
    `;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllCompress').classList.remove('hidden');
}

export { compressImages };