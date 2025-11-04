import { Injectable } from '@angular/core';
import { Product } from '../products/product';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'pcparts_cart_v1';

  private read(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  private write(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItems(): CartItem[] {
    return this.read();
  }

  add(product: Product, qty = 1) {
    const items = this.read();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      const item: CartItem = { ...(product as any), quantity: qty } as CartItem;
      items.push(item);
    }
    this.write(items);
  }

  remove(productId: number) {
    let items = this.read();
    items = items.filter(i => i.id !== productId);
    this.write(items);
  }

  clear() {
    this.write([]);
  }

  updateQuantity(productId: number, qty: number) {
    const items = this.read();
    const it = items.find(i => i.id === productId);
    if (it) {
      it.quantity = Math.max(0, qty);
      this.write(items);
    }
  }

  total(): number {
    const items = this.read();
    return items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 0), 0);
  }
}
