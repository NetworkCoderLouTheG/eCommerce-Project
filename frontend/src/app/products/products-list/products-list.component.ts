import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['All'];
  selectedCategory = 'All';
  loading = true;

  constructor(public productService: ProductService, private cart: CartService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.loading = false;
      // derive categories from product data
      const cats = new Set<string>();
      this.products.forEach(p => {
        const name = (p as any).category?.name ?? (p as any).category ?? null;
        if (name) cats.add(name);
      });
      this.categories = ['All', ...Array.from(cats)];
      this.filteredProducts = this.products;
    });
  }
  addToCart(product: Product) {
    // delegate to CartService
    // CartService expects numbers for id, ensure id exists
    this.cart.add(product, 1);
    // tiny feedback could be added later
  }
  filterByCategory() {
    this.filteredProducts = this.selectedCategory === 'All'
      ? this.products
      : this.products.filter(p => {
          // category may be an object with a name or a plain string depending on API
          const catName = (p as any).category?.name ?? (p as any).category;
          return catName === this.selectedCategory;
        });
  }

  // image selection moved to ProductService.imageForProduct
  // components should use productService.imageForProduct(product)
}
