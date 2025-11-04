// Downloads representative images for each sample product and saves them to frontend/src/assets/products
// Usage: node frontend/tools/download-images.js
// Requires internet access. Uses source.unsplash.com to fetch representative images based on product name.

const fs = require('fs');
const path = require('path');
const fetch = global.fetch || require('node-fetch');

const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'products');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const PRODUCTS = [
  'NVIDIA RTX 4090',
  'NVIDIA RTX 4080',
  'NVIDIA RTX 4070',
  'AMD Radeon RX 7900 XTX',
  'Intel Core i9-13900K',
  'AMD Ryzen 9 7950X',
  'AMD Ryzen 7 7800X3D',
  'ASUS Prime X570',
  'MSI B550 Tomahawk',
  'Corsair Vengeance RGB Pro 32GB (2x16)',
  'Samsung 980 PRO 1TB',
  'WD Blue 2TB HDD',
  'Corsair RM750x',
  'NZXT H510',
  'Cooler Master Hyper 212'
];

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function downloadImageFor(name) {
  const s = slug(name);
  const out = path.join(OUT_DIR, `${s}.jpg`);
  if (fs.existsSync(out)) {
    console.log('Exists:', out);
    return;
  }
  // Create a focused search query from the product name
  const q = encodeURIComponent(name.split(' ').slice(0, 4).join(','));
  const url = `https://source.unsplash.com/1600x900/?${q}`;
  console.log('Downloading', name, '->', out);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Bad response ${res.status}`);
    // follow redirects - node-fetch follows by default
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(out, Buffer.from(buffer));
    console.log('Saved', out);
  } catch (err) {
    console.error('Failed to download for', name, err.message);
  }
}

(async function main() {
  for (const p of PRODUCTS) {
    // throttle lightly
    await downloadImageFor(p);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('Done');
})();
