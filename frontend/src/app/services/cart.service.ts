import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: { product: Product, quantity: number }[] = [];

  addToCart(product: Product, qty: number = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      if(existing.quantity + qty <= product.stockQuantity){
        existing.quantity += qty;
      }
    } else {
      this.items.push({ product, quantity: qty });
    }
  }

  getItems() {
    return this.items;
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
  }
}
