import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  get items() {
    return this.cartService.getItems();
  }

  constructor(public cartService: CartService) {}

  updateQty(item: { product: Product; quantity: number }, event: any) {
    let newQty = +event.target.value;
    if (newQty < 1) newQty = 1;
    if (newQty > item.product.stockQuantity) newQty = item.product.stockQuantity;
    item.quantity = newQty;
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId!); // Non-null assertion for strict TS
  }

  get total() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
