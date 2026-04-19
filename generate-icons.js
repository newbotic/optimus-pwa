import sharp from 'sharp';
import fs from 'fs';

// Creează folderul dacă nu există
if (!fs.existsSync('public/icons')) {
  fs.mkdirSync('public/icons', { recursive: true });
}

// Funcție pentru a crea SVG cu litera O
function createSVG(size) {
  const fontSize = size * 0.5;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#6366f1"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize}px" 
            fill="white">O</text>
    </svg>
  `;
}

// Generează icon-192.png
const svg192 = createSVG(192);
sharp(Buffer.from(svg192))
  .png()
  .toFile('public/icons/icon-192.png')
  .then(() => console.log('✅ Generated icon-192.png with O'));

// Generează icon-512.png
const svg512 = createSVG(512);
sharp(Buffer.from(svg512))
  .png()
  .toFile('public/icons/icon-512.png')
  .then(() => console.log('✅ Generated icon-512.png with O'));

// Generează și SVG-uri pentru fallback
fs.writeFileSync('public/icons/icon-192.svg', createSVG(192));
fs.writeFileSync('public/icons/icon-512.svg', createSVG(512));
console.log('✅ Generated SVG icons with O');
