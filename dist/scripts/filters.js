import { uploadedImages, formatFileSize } from './utils.js';

async function applyAdvancedFilters() {
  const images = uploadedImages.advanced;
  if (images.length === 0) {
    alert('هیچ تصویری انتخاب نشده!');
    return;
  }

  const filterType = document.getElementById('filterType').value;
  const filterIntensity = parseFloat(document.getElementById('filterIntensity').value) || 0.5;

  const output = document.getElementById('advancedOutput');
  output.innerHTML = 'در حال پردازش...';

  let outputContent = '';

  try {
    const canvas = document.createElement('canvas');
    const fxCanvas = fx.canvas();

    for (const img of images) {
      const image = new Image();
      image.src = img.url;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
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
      }

      fxCanvas.update();
      const filteredImage = new Image();
      filteredImage.src = fxCanvas.toDataURL('image/png');

      await new Promise((resolve) => {
        filteredImage.onload = resolve;
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const url = URL.createObjectURL(blob);

      outputContent += `
        <div class="preview-img-container border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
          <img src="${url}" alt="Filtered Image" class="max-w-full h-auto">
          <div class="image-info mt-2">
            <p class="text-gray-700 dark:text-gray-300">نام تصویر: ${img.file.name}</p>
            <p class="text-gray-700 dark:text-gray-300">حجم تصویر: ${formatFileSize(blob.size)}</p>
            <p class="text-gray-700 dark:text-gray-300">ابعاد تصویر: ${image.width} × ${image.height} px</p>
          </div>
          <a href="${url}" download="${img.file.name}" class="text-blue-700 hover:underline mt-2 inline-block">دانلود</a>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error in applying filters:', err);
    outputContent += `<p class="text-red-500">خطا در اعمال فیلتر: ${err.message}</p>`;
  }

  output.innerHTML = outputContent;
  document.getElementById('downloadAllAdvanced')?.classList.remove('hidden');
}

document.getElementById('applyFilters')?.addEventListener('click', applyAdvancedFilters);

export { applyAdvancedFilters };