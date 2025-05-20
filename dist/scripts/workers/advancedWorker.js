console.log('Loading advancedWorker.js version with createImageBitmap');

self.addEventListener('message', async (e) => {
  const {
    image, watermarkType, watermarkText, watermarkImage, font, fontSize, opacity,
    position, color, scale, brightness, contrast, saturation, blur, sepia,
    grayscale, vignette, rotation, flipHorizontal, flipVertical
  } = e.data;

  console.log('Worker received message:', { watermarkType, watermarkText, font, fontSize });

  const canvas = new OffscreenCanvas(1, 1);
  const ctx = canvas.getContext('2d');

  try {
    // Use createImageBitmap instead of Image for Web Worker
    const imgBitmap = await createImageBitmap(image);
    console.log('Worker loaded image bitmap');

    canvas.width = imgBitmap.width;
    canvas.height = imgBitmap.height;
    ctx.drawImage(imgBitmap, 0, 0);
    imgBitmap.close(); // Free up memory

    // Apply transformations
    if (rotation || flipHorizontal || flipVertical) {
      const tempCanvas = new OffscreenCanvas(canvas.width, canvas.height);
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.translate(canvas.width / 2, canvas.height / 2);
      tempCtx.rotate(rotation * Math.PI / 180);
      if (flipHorizontal) tempCtx.scale(-1, 1);
      if (flipVertical) tempCtx.scale(1, -1);
      tempCtx.translate(-canvas.width / 2, -canvas.height / 2);
      tempCtx.drawImage(canvas, 0, 0);
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
      ctx.drawImage(tempCanvas, 0, 0);
    }

    // Apply filters
    try {
      ctx.filter = `
        brightness(${brightness})
        contrast(${contrast})
        saturate(${saturation})
        blur(${blur}px)
        sepia(${sepia})
        ${grayscale ? 'grayscale(1)' : ''}
      `;
      ctx.drawImage(canvas, 0, 0);
    } catch (err) {
      console.error('Error applying filters:', err);
      throw new Error('خطا در اعمال فیلترها');
    }

    // Apply vignette
    if (vignette > 0) {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, `rgba(0,0,0,${vignette})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Apply watermark
    if (watermarkType === 'text' && watermarkText) {
      try {
        // Use fallback font if specified fonts fail
        const fontName = ['Vazir', 'Sahel', 'Samim'].includes(font) ? font : 'Arial';
        ctx.font = `${fontSize}px ${fontName}`;
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        const textWidth = ctx.measureText(watermarkText).width;
        const textHeight = fontSize;
        let x, y;
        switch (position) {
          case 'center':
            x = (canvas.width - textWidth) / 2;
            y = (canvas.height + textHeight) / 2;
            break;
          case 'top-left':
            x = 10;
            y = textHeight + 10;
            break;
          case 'top-right':
            x = canvas.width - textWidth - 10;
            y = textHeight + 10;
            break;
          case 'bottom-left':
            x = 10;
            y = canvas.height - 10;
            break;
          case 'bottom-right':
            x = canvas.width - textWidth - 10;
            y = canvas.height - 10;
            break;
        }
        ctx.fillText(watermarkText, x, y);
        ctx.globalAlpha = 1;
        console.log('Text watermark applied:', watermarkText);
      } catch (err) {
        console.error('Error applying text watermark:', err);
        throw new Error('خطا در اعمال واترمارک متنی');
      }
    } else if (watermarkType === 'image' && watermarkImage) {
      try {
        const wmBitmap = await createImageBitmap(watermarkImage);
        console.log('Worker loaded watermark image bitmap');

        const wmWidth = wmBitmap.width * scale;
        const wmHeight = wmBitmap.height * scale;
        let x, y;
        switch (position) {
          case 'center':
            x = (canvas.width - wmWidth) / 2;
            y = (canvas.height - wmHeight) / 2;
            break;
          case 'top-left':
            x = 10;
            y = 10;
            break;
          case 'top-right':
            x = canvas.width - wmWidth - 10;
            y = 10;
            break;
          case 'bottom-left':
            x = 10;
            y = canvas.height - wmHeight - 10;
            break;
          case 'bottom-right':
            x = canvas.width - wmWidth - 10;
            y = canvas.height - wmHeight - 10;
            break;
        }
        ctx.globalAlpha = opacity;
        ctx.drawImage(wmBitmap, x, y, wmWidth, wmHeight);
        ctx.globalAlpha = 1;
        wmBitmap.close();
        console.log('Image watermark applied');
      } catch (err) {
        console.error('Error applying image watermark:', err);
        throw new Error('خطا در اعمال واترمارک تصویری');
      }
    }

    canvas.convertToBlob({ type: 'image/png' }).then((blob) => {
      console.log('Worker sending blob back');
      self.postMessage(blob);
    }).catch((err) => {
      console.error('Worker blob conversion error:', err);
      self.postMessage({ error: err.message });
    });
  } catch (err) {
    console.error('Worker general error:', err);
    self.postMessage({ error: err.message });
  }
});