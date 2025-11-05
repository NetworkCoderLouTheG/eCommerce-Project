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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cat = params.get('category');
      this.categoryId = cat ? +cat : null;
      if (this.categoryId) {
        this.productService.getProductsByCategory(this.categoryId)
          .subscribe(products => this.initProducts(products));
      } else {
        this.productService.getAllProducts()
          .subscribe(products => this.initProducts(products));
      }
    });
  }

  private initProducts(products: Product[]) {
    this.products = products.map(p => {
      if (p.quantity === undefined || p.quantity === null) {
        p.quantity = 1;
      }
      if (p.stockQuantity === undefined || p.stockQuantity === null) {
        p.stockQuantity = 0;
      }
      if (p.stockQuantity <= 0) {
        p.stockQuantity = 10;
        (p as any)._demoRestocked = true;
      }
      return p;
    });
  }

  addToCart(product: Product, qty?: number) {
    const desired = qty && qty > 0 ? qty : (product.quantity && product.quantity > 0 ? product.quantity : 1);

    if (product.stockQuantity <= 0) {
      return;
    }

    const addQty = Math.min(desired, product.stockQuantity);

    product.stockQuantity = product.stockQuantity - addQty;

    this.cartService.addToCart(product, addQty);
  }

  isDemo(product: Product): boolean {
    return !!(product as any)._demoRestocked;
  }
}
