import { setupDragAndDrop, clearOutput, downloadAllImages } from './utils.js';
import { compressImages } from './compress.js';
import { resizeImages } from './resize.js';
import { startCrop, cropImage, cancelCrop } from './crop.js';
import { changeCanvasSize } from './canvas.js';
import { applyAdvancedEdit, setupAdvancedPreview } from './advanced.js';
import { convertImages } from './convert.js';
import { removeBackground } from './bgRemove.js';

const translations = {
  fa: {
    title: 'ویرایش تصاویر با هوش مصنوعی پیشرفته',
    compressTab: 'فشرده‌سازی',
    resizeTab: 'تغییر سایز',
    cropTab: 'کراپ',
    canvasTab: 'تغییر اندازه بوم',
    advancedTab: 'ویرایش پیشرفته',
    convertTab: 'تبدیل فرمت',
    bgRemoveTab: 'حذف پس‌زمینه',
    compressDescription: 'تصاویر خود را انتخاب کنید یا اینجا بکشید و رها کنید.',
    resizeDescription: 'تصاویر خود را انتخاب کنید و سایز را تنظیم کنید.',
    cropDescription: 'تصاویر خود را انتخاب کنید و کراپ کنید.',
    canvasDescription: 'تصاویر خود را انتخاب کنید و اندازه بوم را تغییر دهید.',
    advancedDescription: 'تصاویر خود را انتخاب کنید و واترمارک، فیلترها یا تغییرات دیگر اعمال کنید.',
    convertDescription: 'تصاویر خود را انتخاب کنید و فرمت را تغییر دهید.',
    bgRemoveDescription: 'تصاویر خود را انتخاب کنید و پس‌زمینه را حذف کنید.',
    dropZone: 'تصاویر را اینجا بکشید یا کلیک کنید',
    compressType: 'نوع فشرده‌سازی:',
    standard: 'استاندارد',
    advancedAI: 'هوش مصنوعی پیشرفته',
    quality: 'کیفیت (0.1 تا 1):',
    outputFormat: 'فرمت خروجی:',
    compressButton: 'فشرده‌سازی تصاویر',
    clearButton: 'پاک کردن',
    downloadAll: 'دانلود همه (ZIP)',
    resizeType: 'نوع تغییر سایز:',
    pixels: 'پیکسل',
    percent: 'درصد',
    width: 'عرض (px):',
    height: 'ارتفاع (px):',
    percentLabel: 'درصد (%):',
    resizeButton: 'تغییر سایز',
    startCrop: 'شروع کراپ',
    confirmCrop: 'تأیید کراپ',
    cancelCrop: 'لغو',
    canvasWidth: 'عرض بوم (px):',
    canvasHeight: 'ارتفاع بوم (px):',
    backgroundColor: 'رنگ پس‌زمینه:',
    changeCanvas: 'تغییر اندازه بوم',
    watermarkSettings: 'تنظیمات واترمارک',
    watermarkType: 'نوع واترمارک:',
    textWatermark: 'متن',
    imageWatermark: 'تصویر',
    watermarkText: 'متن واترمارک:',
    font: 'فونت:',
    customFont: 'آپلود فونت (TTF/OTF):',
    fontSize: 'اندازه فونت (px):',
    watermarkImage: 'تصویر واترمارک:',
    imageScale: 'مقیاس تصویر (%):',
    color: 'رنگ (برای متن):',
    opacity: 'شفافیت (0-1):',
    position: 'موقعیت:',
    filterSettings: 'فیلترهای پیشرفته',
    brightness: 'روشنایی (%):',
    contrast: 'کنتراست (%):',
    saturation: 'اشباع (%):',
    blur: 'محو (px):',
    sepia: 'سپیا (%):',
    grayscale: 'سیاه‌وسفید',
    vignette: 'وینیت (%):',
    transformSettings: 'تحولات تصویر',
    rotation: 'زاویه چرخش (درجه):',
    flip: 'معکوس کردن:',
    flipHorizontal: 'افقی',
    flipVertical: 'عمودی',
    reset: 'بازنشانی',
    applyChanges: 'اعمال تغییرات',
    convertButton: 'تبدیل فرمت',
    bgColor: 'رنگ پس‌زمینه برای حذف:',
    tolerance: 'تحمل رنگ (%):',
    removeBgButton: 'حذف پس‌زمینه'
  },
  en: {
    title: 'Advanced Image Editor with AI',
    compressTab: 'Compression',
    resizeTab: 'Resize',
    cropTab: 'Crop',
    canvasTab: 'Canvas Size',
    advancedTab: 'Advanced Edit',
    convertTab: 'Format Conversion',
    bgRemoveTab: 'Background Removal',
    compressDescription: 'Select your images or drag and drop them here.',
    resizeDescription: 'Select your images and adjust the size.',
    cropDescription: 'Select your images and crop them.',
    canvasDescription: 'Select your images and change the canvas size.',
    advancedDescription: 'Select your images and apply watermarks, filters, or other changes.',
    convertDescription: 'Select your images and change their format.',
    bgRemoveDescription: 'Select your images and remove the background.',
    dropZone: 'Drag images here or click to upload',
    compressType: 'Compression Type:',
    standard: 'Standard',
    advancedAI: 'Advanced AI',
    quality: 'Quality (0.1 to 1):',
    outputFormat: 'Output Format:',
    compressButton: 'Compress Images',
    clearButton: 'Clear',
    downloadAll: 'Download All (ZIP)',
    resizeType: 'Resize Type:',
    pixels: 'Pixels',
    percent: 'Percent',
    width: 'Width (px):',
    height: 'Height (px):',
    percentLabel: 'Percent (%):',
    resizeButton: 'Resize',
    startCrop: 'Start Crop',
    confirmCrop: 'Confirm Crop',
    cancelCrop: 'Cancel',
    canvasWidth: 'Canvas Width (px):',
    canvasHeight: 'Canvas Height (px):',
    backgroundColor: 'Background Color:',
    changeCanvas: 'Change Canvas Size',
    watermarkSettings: 'Watermark Settings',
    watermarkType: 'Watermark Type:',
    textWatermark: 'Text',
    imageWatermark: 'Image',
    watermarkText: 'Watermark Text:',
    font: 'Font:',
    customFont: 'Upload Font (TTF/OTF):',
    fontSize: 'Font Size (px):',
    watermarkImage: 'Watermark Image:',
    imageScale: 'Image Scale (%):',
    color: 'Color (for text):',
    opacity: 'Opacity (0-1):',
    position: 'Position:',
    filterSettings: 'Advanced Filters',
    brightness: 'Brightness (%):',
    contrast: 'Contrast (%):',
    saturation: 'Saturation (%):',
    blur: 'Blur (px):',
    sepia: 'Sepia (%):',
    grayscale: 'Grayscale',
    vignette: 'Vignette (%):',
    transformSettings: 'Image Transformations',
    rotation: 'Rotation Angle (degrees):',
    flip: 'Flip:',
    flipHorizontal: 'Horizontal',
    flipVertical: 'Vertical',
    reset: 'Reset',
    applyChanges: 'Apply Changes',
    convertButton: 'Convert Format',
    bgColor: 'Background Color to Remove:',
    tolerance: 'Color Tolerance (%):',
    removeBgButton: 'Remove Background'
  }
};

const tabs = {
  compress: {
    button: document.getElementById('compressTab'),
    section: document.getElementById('compressSection'),
    setup: () => setupDragAndDrop('compress')
  },
  resize: {
    button: document.getElementById('resizeTab'),
    section: document.getElementById('resizeSection'),
    setup: () => setupDragAndDrop('resize')
  },
  crop: {
    button: document.getElementById('cropTab'),
    section: document.getElementById('cropSection'),
    setup: () => setupDragAndDrop('crop')
  },
  canvas: {
    button: document.getElementById('canvasTab'),
    section: document.getElementById('canvasSection'),
    setup: () => setupDragAndDrop('canvas')
  },
  advanced: {
    button: document.getElementById('advancedTab'),
    section: document.getElementById('advancedSection'),
    setup: () => {
      setupDragAndDrop('advanced');
      setupAdvancedPreview();
    }
  },
  convert: {
    button: document.getElementById('convertTab'),
    section: document.getElementById('convertSection'),
    setup: () => setupDragAndDrop('convert')
  },
  bgRemove: {
    button: document.getElementById('bgRemoveTab'),
    section: document.getElementById('bgRemoveSection'),
    setup: () => setupDragAndDrop('bgRemove')
  }
};

function switchTab(activeTab) {
  Object.values(tabs).forEach(tab => {
    tab.section.classList.add('hidden');
    tab.button.classList.remove('bg-blue-700', 'text-white');
    tab.button.classList.add('bg-gray-200', 'text-gray-700');
  });

  tabs[activeTab].section.classList.remove('hidden');
  tabs[activeTab].button.classList.remove('bg-gray-200', 'text-gray-700');
  tabs[activeTab].button.classList.add('bg-blue-700', 'text-white');
  tabs[activeTab].setup();
}

function initializeTabs() {
  Object.keys(tabs).forEach(tab => {
    tabs[tab].button.addEventListener('click', () => switchTab(tab));
  });
  switchTab('compress');
}

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[lang][key] || element.textContent;
    if (element.tagName === 'INPUT' && element.type === 'radio') {
      element.nextSibling.textContent = translations[lang][key] || element.nextSibling.textContent;
    }
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const icon = document.getElementById('toggleTheme').querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
}

try {
  window.compressImages = compressImages;
  window.clearOutput = clearOutput;
  window.downloadAllImages = downloadAllImages;
  window.resizeImages = resizeImages;
  window.startCrop = startCrop;
  window.cropImage = cropImage;
  window.cancelCrop = cancelCrop;
  window.changeCanvasSize = changeCanvasSize;
  window.applyAdvancedEdit = applyAdvancedEdit;
  window.convertImages = convertImages;
  window.removeBackground = removeBackground;

  initializeTabs();
  setLanguage('fa');

  document.getElementById('languageSelect').addEventListener('change', (e) => setLanguage(e.target.value));
  document.getElementById('toggleTheme').addEventListener('click', toggleTheme);
} catch (error) {
  console.error('خطا در مقداردهی اولیه:', error);
  document.body.innerHTML += '<p class="text-red-500 text-center">خطایی در بارگذاری برنامه رخ داد. لطفاً کنسول مرورگر را بررسی کنید.</p>';
}