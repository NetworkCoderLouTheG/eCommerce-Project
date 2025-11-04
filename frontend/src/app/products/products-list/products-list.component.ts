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
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['All', 'GPU', 'CPU', 'Motherboard'];
  selectedCategory = 'All';

  constructor(private productService: ProductService, private cart: CartService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
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
}
