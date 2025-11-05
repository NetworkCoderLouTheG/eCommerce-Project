import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartService.getCartTotal();
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0 && item.product.id) {
      this.cartService.updateQuantity(item.product.id, newQuantity);
    }
  }

  removeItem(item: CartItem) {
    if (confirm(`Remove ${item.product.name} from cart?`)) {
      if (item.product.id) {
        this.cartService.removeFromCart(item.product.id);
      }
    }
  }

  clearCart() {
    if (confirm('Clear entire cart?')) {
      this.cartService.clearCart();
    }
  }

  checkout() {
    if (this.cartItems.length > 0) {
      alert('Checkout functionality coming soon! Your order total is $' + this.total.toFixed(2));
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }
}
