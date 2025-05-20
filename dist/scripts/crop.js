import { uploadedImages, formatFileSize } from './utils.js';
import { translations } from './translations.js';

let cropper = null;

function startCrop() {
  const images = uploadedImages.crop;
  if (images.length === 0) {
    alert(translations[document.documentElement.lang].noImageSelected);
    return;
  }

  const cropContainer = document.getElementById('cropContainer');
  const cropImage = document.getElementById('cropImage');
  cropContainer.classList.remove('hidden');
  cropImage.src = images[0].url;

  if (cropper) {
    cropper.destroy();
  }

  cropper = new Cropper(cropImage, {
    aspectRatio: NaN,
    viewMode: 1,
    autoCropArea: 0.5,
    responsive: true,
  });
}

async function cropImage() {
  if (!cropper) return;

  const canvas = cropper.getCroppedCanvas();
  const output = document.getElementById('cropOutput');
  output.innerHTML = translations[document.documentElement.lang].processing;

  let outputContent = '';

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.8);
  });

  const url = URL.createObjectURL(blob);
  const dimensions = `${canvas.width} × ${canvas.height} px`;
  outputContent += `
    <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
      <img src="${url}" alt="Cropped Image" class="max-w-full h-auto">
      <div class="image-info mt-2">
        <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${uploadedImages.crop[0].file.name}</p>
        <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(blob.size)}</p>
        <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageDimensions}${dimensions}</p>
      </div>
      <a href="${url}" download="${uploadedImages.crop[0].file.name}" class="text-blue-700 hover:underline mt-2 inline-block">
        ${translations[document.documentElement.lang].download}
      </a>
    </div>
  `;

  output.innerHTML = outputContent;
  document.getElementById('downloadAllCrop').classList.remove('hidden');
  cancelCrop();
}

function cancelCrop() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  document.getElementById('cropContainer').classList.add('hidden');
}

export { startCrop, cropImage, cancelCrop };