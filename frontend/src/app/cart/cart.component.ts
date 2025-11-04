import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  items = [] as any[];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.items = this.cart.getItems();
  }

  remove(id: number) {
    this.cart.remove(id);
    this.refresh();
  }

  clear() {
    this.cart.clear();
    this.refresh();
  }

  updateQty(id: number, qty: number) {
    this.cart.updateQuantity(id, qty);
    this.refresh();
  }

  getTotal(): number {
    return this.cart.total();
  }
}
