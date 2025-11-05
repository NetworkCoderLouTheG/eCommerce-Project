import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  get items() {
    return this.cartService.getItems();
  }

  constructor(public cartService: CartService) {}

  updateQty(item: { product: Product; quantity: number }, event: Event) {
    const input = event.target as HTMLInputElement;
    let newQty = Number(input.value);
    if (Number.isNaN(newQty) || newQty < 1) newQty = 1;
    if (newQty > item.product.stockQuantity) newQty = item.product.stockQuantity;
    item.quantity = newQty;
    // persist the change via service
    if (item.product.id) {
      this.cartService.updateQuantity(item.product.id, item.quantity);
    }
  }

  remove(productId?: number) {
    if (productId === undefined || productId === null) return;
    this.cartService.removeFromCart(productId);
  }

  get total(): number {
    return this.items.reduce(
      (sum: number, item: { product: Product; quantity: number }) => sum + item.product.price * item.quantity,
      0
    );
  }
}
