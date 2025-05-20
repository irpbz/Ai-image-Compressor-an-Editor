import { translations } from './translations.js';

let isProcessing = false;

const uploadedImages = {
  compress: [],
  resize: [],
  crop: [],
  canvas: [],
  advanced: [],
  convert: [],
  bgRemove: []
};

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function setupDragAndDrop(section) {
  const dropZone = document.getElementById(`${section}DropZone`);
  const input = document.getElementById(`${section}ImageInput`);
  const preview = document.getElementById(`${section}Preview`);

  if (!dropZone || !input || !preview) {
    console.error(`Elements for section ${section} not found:`, { dropZone, input, preview });
    return;
  }

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!isProcessing) dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (isProcessing) return;
    isProcessing = true;

    const files = e.dataTransfer.files;
    console.log(`Dropped files in ${section}:`, files);
    await handleFiles(files, section, preview);

    isProcessing = false;
  });

  input.addEventListener('change', async (e) => {
    if (isProcessing) {
      console.log(`Processing in progress, ignoring input change for ${section}`);
      return;
    }
    isProcessing = true;

    const files = e.target.files;
    console.log(`Selected files via click in ${section}:`, files);
    await handleFiles(files, section, preview);

    e.target.value = '';
    isProcessing = false;
  });

  // Ensure clicking dropZone triggers input click
  dropZone.addEventListener('click', () => {
    console.log(`Drop zone clicked for ${section}, triggering input click`);
    input.click();
  });
}

async function handleFiles(files, section, preview) {
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    await new Promise((resolve) => {
      img.onload = () => {
        const dimensions = `${img.width} × ${img.height} px`;
        const container = document.createElement('div');
        container.className = 'preview-img-container';
        container.innerHTML = `
          <img src="${url}" alt="${file.name}" class="max-w-full h-auto">
          <i class="fas fa-trash delete-icon" data-section="${section}" data-index="${uploadedImages[section].length}"></i>
          <div class="image-info mt-2">
            <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageName}${file.name}</p>
            <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageSize}${formatFileSize(file.size)}</p>
            <p class="text-gray-700 dark:text-gray-300">${translations[document.documentElement.lang].imageDimensions}${dimensions}</p>
          </div>
        `;
        preview.appendChild(container);
        uploadedImages[section].push({ file, url });
        resolve();
      };
    });
  }

  document.getElementById(`downloadAll${section.charAt(0).toUpperCase() + section.slice(1)}`).classList.toggle('hidden', uploadedImages[section].length === 0);
}

function deleteImage(section, index) {
  URL.revokeObjectURL(uploadedImages[section][index].url);
  uploadedImages[section].splice(index, 1);
  const preview = document.getElementById(`${section}Preview`);
  preview.children[index].remove();
  document.getElementById(`downloadAll${section.charAt(0).toUpperCase() + section.slice(1)}`).classList.toggle('hidden', uploadedImages[section].length === 0);
}

function clearOutput(section) {
  uploadedImages[section].forEach(img => URL.revokeObjectURL(img.url));
  uploadedImages[section] = [];
  document.getElementById(`${section}Preview`).innerHTML = '';
  document.getElementById(`${section}Output`).innerHTML = '';
  document.getElementById(`downloadAll${section.charAt(0).toUpperCase() + section.slice(1)}`).classList.add('hidden');
}

async function downloadAllImages(section) {
  const zip = new JSZip();
  const output = document.getElementById(`${section}Output`);
  const images = output.querySelectorAll('img');

  for (let i = 0; i < images.length; i++) {
    const response = await fetch(images[i].src);
    const blob = await response.blob();
    zip.file(`${section}_${i + 1}.${blob.type.split('/')[1]}`, blob);
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${section}_images.zip`);
  });
}

// Add event listener for delete icons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-icon')) {
    const section = e.target.dataset.section;
    const index = parseInt(e.target.dataset.index);
    console.log(`Deleting image in ${section} at index ${index}`);
    deleteImage(section, index);
  }
});

export { setupDragAndDrop, clearOutput, downloadAllImages, uploadedImages, formatFileSize, deleteImage };