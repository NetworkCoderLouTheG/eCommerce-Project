import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categoryId: number | null = null;
  desiredQty: { [productId: number]: number } = {};

  get isGrid() {
    return !this.categoryId;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cat = params.get('category');
      this.categoryId = cat ? +cat : null;
      const qtyDefault = 1;
      const setDesiredQty = (products: Product[]) => {
        this.products = products;
        products.forEach(product => this.desiredQty[product.id!] = qtyDefault);
      };
      if (this.categoryId) {
        this.productService.getProductsByCategory(this.categoryId)
          .subscribe(setDesiredQty);
      } else {
        this.productService.getAllProducts()
          .subscribe(setDesiredQty);
      }
    });
  }

  addToCart(product: Product) {
    const qty = this.desiredQty[product.id!] || 1;
    if (qty < 1) return;
    if (qty > product.stockQuantity) return;
    this.cartService.addToCart(product, qty);
  }
}
