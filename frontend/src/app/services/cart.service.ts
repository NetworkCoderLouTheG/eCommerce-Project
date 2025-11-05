import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: { product: Product, quantity: number }[] = [];

  addToCart(product: Product, qty: number = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      const potentialQty = existing.quantity + qty;
      existing.quantity = Math.min(potentialQty, product.stockQuantity);
    } else {
      if (qty <= product.stockQuantity) {
        this.items.push({ product, quantity: qty });
      }
    }
  }

  getItems() {
    return this.items;
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
  }
}
