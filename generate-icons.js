import sharp from 'sharp';
import fs from 'fs';

// Creează folderul dacă nu există
if (!fs.existsSync('public/icons')) {
  fs.mkdirSync('public/icons', { recursive: true });
}

// Generează icon-192.png
sharp({
  create: {
    width: 192,
    height: 192,
    channels: 4,
    background: { r: 99, g: 102, b: 241, alpha: 1 } // #6366f1
  }
})
.png()
.toFile('public/icons/icon-192.png')
.then(() => console.log('✅ Generated icon-192.png'));

// Generează icon-512.png
sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: { r: 99, g: 102, b: 241, alpha: 1 } // #6366f1
  }
})
.png()
.toFile('public/icons/icon-512.png')
.then(() => console.log('✅ Generated icon-512.png'));
