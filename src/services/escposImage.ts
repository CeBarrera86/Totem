// Utilidad para convertir una imagen PNG a comandos ESC/POS (modo gráfico)
// Requiere que la imagen esté en blanco y negro y no supere 512px de ancho para 80mm
// Uso: await escposImageFromUrl('/ruta/Corpico_logo.png')

export async function escposImageFromUrl(url: string): Promise<string> {
  // Cargar imagen
  const img = await loadImage(url);
  // Convertir a canvas blanco y negro
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {throw new Error('No se pudo crear contexto de canvas');}
  ctx.drawImage(img, 0, 0);
  // Convertir a blanco y negro
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
    const v = avg > 128 ? 255 : 0;
    imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = v;
  }
  ctx.putImageData(imageData, 0, 0);
  // Convertir a ESC/POS
  return escposRasterBitImage(canvas);
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
  const ctx = canvas.getContext('2d');
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
