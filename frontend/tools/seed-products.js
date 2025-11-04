// Node script to POST sample products to the backend /api/products
// Usage: node tools/seed-products.js [baseUrl]
// Example: node tools/seed-products.js http://localhost:8080

const BASE = process.argv[2] || 'http://localhost:8080';
const fetch = global.fetch || require('node-fetch');

const SAMPLE_PRODUCTS = [
  { name: 'NVIDIA RTX 4090', description: 'Top-tier enthusiast GPU', price: 1599.0, stock: 5, categoryName: 'GPU' },
  { name: 'NVIDIA RTX 4080', description: 'High-end GPU for creators and gamers', price: 1199.0, stock: 8, categoryName: 'GPU' },
  { name: 'NVIDIA RTX 4070', description: 'Powerful mid-high range GPU', price: 499.0, stock: 20, categoryName: 'GPU' },
  { name: 'AMD Radeon RX 7900 XTX', description: 'AMD flagship GPU for 4K gaming', price: 999.0, stock: 7, categoryName: 'GPU' },
  { name: 'Intel Core i9-13900K', description: '14th gen flagship CPU', price: 589.0, stock: 12, categoryName: 'CPU' },
  { name: 'AMD Ryzen 9 7950X', description: 'High-core-count CPU', price: 699.0, stock: 9, categoryName: 'CPU' },
  { name: 'AMD Ryzen 7 7800X3D', description: 'High-performance CPU for gaming', price: 429.0, stock: 15, categoryName: 'CPU' },
  { name: 'ASUS Prime X570', description: 'Reliable AM4 motherboard', price: 199.0, stock: 10, categoryName: 'Motherboard' },
  { name: 'MSI B550 Tomahawk', description: 'Popular AM4 board', price: 159.0, stock: 14, categoryName: 'Motherboard' },
  { name: 'Corsair Vengeance RGB Pro 32GB (2x16)', description: 'DDR4 3600MHz RAM', price: 129.0, stock: 30, categoryName: 'RAM' },
  { name: 'Samsung 980 PRO 1TB', description: 'NVMe SSD', price: 149.0, stock: 25, categoryName: 'Storage' },
  { name: 'WD Blue 2TB HDD', description: 'Bulk HDD storage', price: 59.0, stock: 40, categoryName: 'Storage' },
  { name: 'Corsair RM750x', description: '750W modular 80+ Gold PSU', price: 119.0, stock: 18, categoryName: 'PSU' },
  { name: 'NZXT H510', description: 'Mid-tower case with tempered glass', price: 79.0, stock: 22, categoryName: 'Case' },
  { name: 'Cooler Master Hyper 212', description: 'Affordable air cooler', price: 39.0, stock: 50, categoryName: 'CPU Cooler' }
];

async function main() {
  console.log('Using backend base URL:', BASE);

  // fetch all products to discover categories (we expect DataLoader to have created some)
  const res = await fetch(`${BASE}/api/products`);
  if (!res.ok) {
    console.error('Failed to fetch existing products:', res.status, await res.text());
    process.exit(1);
  }
  const existing = await res.json();

  // build categoryName -> id map from existing products
  const catMap = new Map();
  (existing || []).forEach(p => {
    const cat = p.category && p.category.name ? p.category.name : (p.category || null);
    const id = p.category && p.category.id ? p.category.id : (p.category && p.category.id) || null;
    if (cat && id) catMap.set(cat, id);
  });

  console.log('Discovered categories:', Array.from(catMap.keys()));

  for (const prod of SAMPLE_PRODUCTS) {
    // skip if already present
    if (existing.find(p => p.name === prod.name)) {
      console.log('Skipping existing product:', prod.name);
      continue;
    }

    const categoryId = catMap.get(prod.categoryName);
    if (!categoryId) {
      console.warn('No categoryId found for', prod.categoryName, '- skipping', prod.name);
      continue;
    }

    // attach a local asset image path so frontend can show stable images
    const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const imagePath = `/assets/products/${slug}.jpg`;

    const dto = {
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      imageUrl: imagePath,
      specs: prod.specs || '',
      categoryId
    };

    const r = await fetch(`${BASE}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });

    if (r.ok) {
      const created = await r.json();
      console.log('Created product:', created.name, 'id=', created.id);
    } else {
      console.error('Failed to create', prod.name, r.status, await r.text());
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
