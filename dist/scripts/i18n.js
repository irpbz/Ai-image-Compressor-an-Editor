// dist/scripts/i18n.js
i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    resources: {
      fa: {
        translation: {
          title: 'ویرایش تصاویر با هوش مصنوعی پیشرفته',
          help: 'راهنما',
          compressTab: 'فشرده سازی',
          resizeTab: 'تغییر سایز',
          cropTab: 'کراپ',
          canvasTab: 'تغییر اندازه بوم',
          advancedTab: 'ویرایش پیشرفته',
          convertTab: 'تبدیل فرمت',
          bgRemoveTab: 'حذف پس زمینه',
          compressDescription: 'تصاویر خود را انتخاب کنید یا اینجا بکشید و رها کنید.',
          resizeDescription: 'تصاویر خود را انتخاب کنید و سایز را تنظیم کنید.',
          cropDescription: 'تصاویر خود را انتخاب کنید و کراپ کنید.',
          canvasDescription: 'تصاویر خود را انتخاب کنید و اندازه بوم را تغییر دهید.',
          advancedDescription: 'تصاویر خود را انتخاب کنید و واترمارک، فیلترها یا تغییرات دیگر اعمال کنید.',
          convertDescription: 'تصاویر خود را انتخاب کنید و فرمت را تغییر دهید.',
          bgRemoveDescription: 'تصاویر خود را انتخاب کنید و پس زمینه را حذف کنید.',
          dropZone: 'تصاویر را اینجا بکشید یا کلیک کنید',
          compressType: 'نوع فشرده سازی:',
          standard: 'استاندارد',
          advancedAI: 'هوش مصنوعی پیشرفته',
          quality: 'کیفیت (0.1 تا 1):',
          outputFormat: 'فرمت خروجی:',
          resizeType: 'نوع تغییر سایز:',
          pixels: 'پیکسل',
          percent: 'درصد',
          width: 'عرض (px):',
          height: 'ارتفاع (px):',
          percentLabel: 'درصد (%):',
          canvasWidth: 'عرض بوم (px):',
          canvasHeight: 'ارتفاع بوم (px):',
          backgroundColor: 'رنگ پس زمینه:',
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
          filterType: 'نوع فیلتر:',
          filterIntensity: 'شدت فیلتر (0-1):',
          applyFilters: 'اعمال فیلتر',
          brightness: 'روشنایی (%):',
          contrast: 'کنتراست (%):',
          saturation: 'اشباع (%):',
          blur: 'محو (px):',
          sepia: 'سپیا (%):',
          grayscale: 'سیاه و سفید',
          vignette: 'وینیت (%):',
          transformSettings: 'تحولات تصویر',
          rotation: 'زاویه چرخش (درجه):',
          reset: 'بازنشانی',
          flip: 'معکوس کردن:',
          flipHorizontal: 'افقی',
          flipVertical: 'عمودی',
          compressButton: 'فشرده سازی تصاویر',
          resizeButton: 'تغییر سایز',
          startCrop: 'شروع کراپ',
          confirmCrop: 'تأیید کراپ',
          cancelCrop: 'لغو',
          changeCanvas: 'تغییر اندازه بوم',
          applyChanges: 'اعمال تغییرات',
          convertButton: 'تبدیل فرمت',
          removeBackground: 'حذف پس زمینه',
          clearButton: 'پاک کردن',
          downloadAll: 'دانلود همه (ZIP)',
          noImageSelected: 'هیچ تصویری انتخاب نشده!',
          processing: 'در حال پردازش...',
          imageName: 'نام تصویر:',
          imageSize: 'حجم تصویر:',
          imageDimensions: 'ابعاد تصویر:',
          download: 'دانلود',
          error: 'خطا:'
        }
      },
      en: {
        translation: {
          title: 'Advanced AI Image Editor',
          help: 'Help',
          compressTab: 'Compress',
          resizeTab: 'Resize',
          cropTab: 'Crop',
          canvasTab: 'Canvas Size',
          advancedTab: 'Advanced Edit',
          convertTab: 'Convert Format',
          bgRemoveTab: 'Background Removal',
          compressDescription: 'Select your images or drag and drop them here.',
          resizeDescription: 'Select your images and adjust the size.',
          cropDescription: 'Select your images and crop them.',
          canvasDescription: 'Select your images and change the canvas size.',
          advancedDescription: 'Select your images and apply watermarks, filters, or other edits.',
          convertDescription: 'Select your images and change the format.',
          bgRemoveDescription: 'Select your images and remove the background.',
          dropZone: 'Drag images here or click to upload',
          compressType: 'Compression Type:',
          standard: 'Standard',
          advancedAI: 'Advanced AI',
          quality: 'Quality (0.1 to 1):',
          outputFormat: 'Output Format:',
          resizeType: 'Resize Type:',
          pixels: 'Pixels',
          percent: 'Percent',
          width: 'Width (px):',
          height: 'Height (px):',
          percentLabel: 'Percent (%):',
          canvasWidth: 'Canvas Width (px):',
          canvasHeight: 'Canvas Height (px):',
          backgroundColor: 'Background Color:',
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
          filterType: 'Filter Type:',
          filterIntensity: 'Filter Intensity (0-1):',
          applyFilters: 'Apply Filter',
          brightness: 'Brightness (%):',
          contrast: 'Contrast (%):',
          saturation: 'Saturation (%):',
          blur: 'Blur (px):',
          sepia: 'Sepia (%):',
          grayscale: 'Grayscale',
          vignette: 'Vignette (%):',
          transformSettings: 'Image Transformations',
          rotation: 'Rotation Angle (degrees):',
          reset: 'Reset',
          flip: 'Flip:',
          flipHorizontal: 'Horizontal',
          flipVertical: 'Vertical',
          compressButton: 'Compress Images',
          resizeButton: 'Resize',
          startCrop: 'Start Crop',
          confirmCrop: 'Confirm Crop',
          cancelCrop: 'Cancel',
          changeCanvas: 'Change Canvas Size',
          applyChanges: 'Apply Changes',
          convertButton: 'Convert Format',
          removeBackground: 'Remove Background',
          clearButton: 'Clear',
          downloadAll: 'Download All (ZIP)',
          noImageSelected: 'No image selected!',
          processing: 'Processing...',
          imageName: 'Image name:',
          imageSize: 'Image size:',
          imageDimensions: 'Image dimensions:',
          download: 'Download',
          error: 'Error:'
        }
      },
      ar: {
        translation: {
          title: 'محرر صور ذكي متقدم',
          help: 'مساعدة',
          compressTab: 'ضغط',
          resizeTab: 'تغيير الحجم',
          cropTab: 'قص',
          canvasTab: 'حجم اللوحة',
          advancedTab: 'تحرير متقدم',
          convertTab: 'تحويل الصيغة',
          bgRemoveTab: 'إزالة الخلفية',
          compressDescription: 'اختر صورك أو اسحبها وأفلتها هنا.',
          resizeDescription: 'اختر صورك وقم بتعديل الحجم.',
          cropDescription: 'اختر صورك وقم بقصها.',
          canvasDescription: 'اختر صورك وغير حجم اللوحة.',
          advancedDescription: 'اختر صورك وقم بتطبيق علامات مائية أو فلاتر أو تعديلات أخرى.',
          convertDescription: 'اختر صورك وغير الصيغة.',
          bgRemoveDescription: 'اختر صورك وأزل الخلفية.',
          dropZone: 'اسحب الصور هنا أو انقر للتحميل',
          compressType: 'نوع الضغط:',
          standard: 'قياسي',
          advancedAI: 'ذكاء اصطناعي متقدم',
          quality: 'الجودة (0.1 إلى 1):',
          outputFormat: 'صيغة الإخراج:',
          resizeType: 'نوع تغيير الحجم:',
          pixels: 'بكسل',
          percent: 'نسبة مئوية',
          width: 'العرض (بكسل):',
          height: 'الارتفاع (بكسل):',
          percentLabel: 'النسبة المئوية (%):',
          canvasWidth: 'عرض اللوحة (بكسل):',
          canvasHeight: 'ارتفاع اللوحة (بكسل):',
          backgroundColor: 'لون الخلفية:',
          watermarkSettings: 'إعدادات العلامة المائية',
          watermarkType: 'نوع العلامة المائية:',
          textWatermark: 'نص',
          imageWatermark: 'صورة',
          watermarkText: 'نص العلامة المائية:',
          font: 'الخط:',
          customFont: 'تحميل خط (TTF/OTF):',
          fontSize: 'حجم الخط (بكسل):',
          watermarkImage: 'صورة العلامة المائية:',
          imageScale: 'مقياس الصورة (%):',
          color: 'اللون (للنص):',
          opacity: 'الشفافية (0-1):',
          position: 'الموضع:',
          filterSettings: 'فلاتر متقدمة',
          filterType: 'نوع الفلتر:',
          filterIntensity: 'شدة الفلتر (0-1):',
          applyFilters: 'تطبيق الفلتر',
          brightness: 'السطوع (%):',
          contrast: 'التباين (%):',
          saturation: 'التشبع (%):',
          blur: 'الضبابية (بكسل):',
          sepia: 'سيبيا (%):',
          grayscale: 'أبيض وأسود',
          vignette: 'فينييت (%):',
          transformSettings: 'تحويلات الصورة',
          rotation: 'زاوية الدوران (درجات):',
          reset: 'إعادة تعيين',
          flip: 'قلب:',
          flipHorizontal: 'أفقي',
          flipVertical: 'عمودي',
          compressButton: 'ضغط الصور',
          resizeButton: 'تغيير الحجم',
          startCrop: 'بدء القص',
          confirmCrop: 'تأكيد القص',
          cancelCrop: 'إلغاء',
          changeCanvas: 'تغيير حجم اللوحة',
          applyChanges: 'تطبيق التغييرات',
          convertButton: 'تحويل الصيغة',
          removeBackground: 'إزالة الخلفية',
          clearButton: 'مسح',
          downloadAll: 'تحميل الكل (ZIP)',
          noImageSelected: 'لم يتم اختيار صورة!',
          processing: 'جاري المعالجة...',
          imageName: 'اسم الصورة:',
          imageSize: 'حجم الصورة:',
          imageDimensions: 'أبعاد الصورة:',
          download: 'تحميل',
          error: 'خطأ:'
        }
      }
    },
    fallbackLng: 'en',
    debug: false
  }, (err) => {
    if (err) console.error('i18next initialization error:', err);
    updateTranslations();
  });

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = i18next.t(key);
  });
  // Update select value to current language
  document.getElementById('languageSelect').value = i18next.language;
}

export { updateTranslations };