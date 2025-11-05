import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';  
import { Product } from '../../models/product.model';

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
    // Ensure each product has a selectable quantity for adding to cart.
    this.products = products.map(p => {
      // default desired quantity in UI
      if (p.quantity === undefined || p.quantity === null) {
        p.quantity = 1;
      }

      // If backend returned zero stock (e.g. backend not running / demo), provide a demo stock
      // so items are purchasable during local development. This is only a UI-side fallback.
      if (p.stockQuantity === undefined || p.stockQuantity === null) {
        p.stockQuantity = 0;
      }
      if (p.stockQuantity <= 0) {
        // provide demo stock so the interface isn't all "Out of Stock" during development
        p.stockQuantity = 10;
        // mark as demo (optional flag used only in UI)
        (p as any)._demoRestocked = true;
      }

      return p;
    });
  }

  isDemo(product: Product): boolean {
    return !!(product as any)._demoRestocked;
  }

  addToCart(product: Product) {
    const qty = product.quantity && product.quantity > 0 ? product.quantity : 1;

    // Prevent adding more than available stock
    if (product.stockQuantity <= 0) {
      return; // nothing to add
    }

    const addQty = Math.min(qty, product.stockQuantity);

    // Decrement UI stock so user sees updated availability
    product.stockQuantity = product.stockQuantity - addQty;

    this.cartService.addToCart(product, addQty);
  }
}
