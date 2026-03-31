// Utilidad para convertir una imagen PNG a comandos ESC/POS (modo gráfico)
// Requiere que la imagen esté en blanco y negro y no supere 512px de ancho para 80mm
// Uso: await escposImageFromUrl('/ruta/Corpico_logo.png')

export async function escposImageFromUrl(url: string, threshold = 128, dithering = true): Promise<string> {
  // Cargar imagen
  const img = await loadImage(url);
  // Redimensionar a 240x96 px (30x12 mm a 203dpi)
  const targetWidth = 240;
  const targetHeight = 96;
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {throw new Error('No se pudo crear contexto de canvas');}
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  // Convertir a blanco y negro con dithering opcional
  const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  if (dithering) {
    floydSteinbergDither(imageData, threshold);
  } else {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
      const v = avg > threshold ? 255 : 0;
      imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = v;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  // Convertir a ESC/POS
  return escposRasterBitImage(canvas);
}

// Dithering Floyd-Steinberg
function floydSteinbergDither(imageData: ImageData, threshold: number) {
  const w = imageData.width;
  const h = imageData.height;
  const data = imageData.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const avg = (data[idx] + data[idx+1] + data[idx+2]) / 3;
      const newPixel = avg > threshold ? 255 : 0;
      const error = avg - newPixel;
      data[idx] = data[idx+1] = data[idx+2] = newPixel;
      // Distribuir el error
      if (x + 1 < w) {data[idx + 4] += error * 7 / 16;}
      if (x - 1 >= 0 && y + 1 < h) {data[idx + 4 * (w - 1) + 4 * w] += error * 3 / 16;}
      if (y + 1 < h) {data[idx + 4 * w] += error * 5 / 16;}
      if (x + 1 < w && y + 1 < h) {data[idx + 4 * (w + 1) + 4 * w] += error * 1 / 16;}
    }
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// Convierte un canvas a comando ESC/POS modo raster
function escposRasterBitImage(canvas: HTMLCanvasElement): string {
  const GS = '\x1D';
  let bytes = '';
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {throw new Error('No se pudo crear contexto de canvas');}
  const imageData = ctx.getImageData(0, 0, width, height).data;
  // Comando: GS v 0
  bytes += `${GS}v0`;
  // Comando: GS ( L p1 p2 p3 p4 fn m xL xH yL yH d1...dk
  // Usamos modo raster: GS v 0 m xL xH yL yH d1...dk
  // m=0, xL/xH=ancho en bytes, yL/yH=alto en puntos
  const widthBytes = Math.ceil(width / 8);
  bytes += String.fromCharCode(0); // m=0
  bytes += String.fromCharCode(widthBytes & 0xFF, (widthBytes >> 8) & 0xFF);
  bytes += String.fromCharCode(height & 0xFF, (height >> 8) & 0xFF);
  // Datos de imagen
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < widthBytes; x++) {
      let b = 0;
      for (let bit = 0; bit < 8; bit++) {
        const px = x * 8 + bit;
        if (px < width) {
          const idx = (y * width + px) * 4;
          const v = imageData[idx] < 128 ? 1 : 0;
          b |= v << (7 - bit);
        }
      }
      bytes += String.fromCharCode(b);
    }
  }
  return bytes;
}
