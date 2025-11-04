import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product'; // Update path as needed

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // use relative API path so the dev server proxy or same-origin requests work
  private apiUrl = '/api/products';

  // small local fallback so frontend development can continue if backend is down
  private FALLBACK_PRODUCTS: Product[] = [
    { id: 1001, name: 'Sample NVIDIA RTX 4070', description: 'Sample GPU for development', price: 499.0, stock: 10, imageUrl: '/assets/products/nvidia-rtx-4070.jpg', specs: '', category: { id: 1, name: 'GPU' } },
    { id: 1002, name: 'Sample AMD Ryzen 7 7800X3D', description: 'Sample CPU for development', price: 429.0, stock: 8, imageUrl: '/assets/products/amd-ryzen-7-7800x3d.jpg', specs: '', category: { id: 2, name: 'CPU' } }
  ];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(err => {
          console.warn('ProductService: backend unreachable, returning fallback products', err && err.message);
          return of(this.FALLBACK_PRODUCTS);
        })
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(() => {
          const p = this.FALLBACK_PRODUCTS.find(x => x.id === id);
          return of(p as Product);
        })
      );
  }

  // Return a local image asset or the backend imageUrl when available.
  imageForProduct(p: Product): string {
    if (!p) return 'assets/products/default.svg';
    if (p.imageUrl && p.imageUrl.trim().length > 0) return p.imageUrl;
    const name = (p.name || '').toLowerCase();
    const cat = (p as any).category?.name ?? (p as any).category ?? '';
    const c = (cat || '').toLowerCase();

    if (c.includes('gpu') || name.includes('rtx') || name.includes('radeon')) return 'assets/products/gpu.svg';
    if (c.includes('cpu') || name.includes('ryzen') || name.includes('intel')) return 'assets/products/cpu.svg';
    if (c.includes('motherboard') || name.includes('motherboard') || name.includes('asus') || name.includes('msi')) return 'assets/products/motherboard.svg';
    if (c.includes('ram') || name.includes('ram')) return 'assets/products/ram.svg';
    if (c.includes('storage') || name.includes('ssd') || name.includes('hdd') || name.includes('nvme')) return 'assets/products/storage.svg';
    if (c.includes('psu')) return 'assets/products/psu.svg';
    if (c.includes('case')) return 'assets/products/case.svg';
    if (c.includes('cooler') || name.includes('cooler')) return 'assets/products/cooler.svg';

    return 'assets/products/default.svg';
  }
}
