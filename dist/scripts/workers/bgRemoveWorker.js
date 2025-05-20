self.onmessage = async function(e) {
  try {
    const { file, index, bgColor, tolerance } = e.data;

    const img = await createImageBitmap(file);
    const canvas = new OffscreenCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const targetRGB = hexToRGB(bgColor);
    const toleranceValue = tolerance / 100 * 255;

    for (let i = 0; i < data.length; i += 4) {
      const rDiff = Math.abs(data[i] - targetRGB.r);
      const gDiff = Math.abs(data[i + 1] - targetRGB.g);
      const bDiff = Math.abs(data[i + 2] - targetRGB.b);

      if (rDiff <= toleranceValue && gDiff <= toleranceValue && bDiff <= toleranceValue) {
        data[i + 3] = 0; // Make pixel transparent
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    self.postMessage({ index, blob });
  } catch (error) {
    self.postMessage({ index, error: error.message });
  }
};

function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}