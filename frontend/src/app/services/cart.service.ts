import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        this.cartItems.next(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved cart:', e);
      }
    }
  }

  addToCart(product: Product, qty: number = 1): void {
    const items = [...this.cartItems.value];
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + qty, product.stockQuantity);
    } else {
      items.push({ product, quantity: Math.min(qty, product.stockQuantity) });
    }
    this.updateCart(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = [...this.cartItems.value];
    const item = items.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      this.updateCart(items);
    }
  }

  removeFromCart(productId: number): void {
    const items = this.cartItems.value.filter(i => i.product.id !== productId);
    this.updateCart(items);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, it) => count + it.quantity, 0);
  }

  /**
   * Synchronous access to current items (useful in templates/getters).
   */
  getItems(): CartItem[] {
    return this.cartItems.value;
  }

  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }
}
