import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  productId = 0;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      if (this.productId) {
        this.productService.getProduct(this.productId).subscribe(p => this.product = p);
      }
    });
  }

  addToCart() {
    if (this.product) this.cart.add(this.product, 1);
  }
}
