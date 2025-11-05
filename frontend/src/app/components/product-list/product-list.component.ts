import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryId: number | null = null;
  searchQuery = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchProducts(params['search']);
      } else if (params['category']) {
        this.filterByCategory(+params['category']);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    if (categoryId) {
      this.productService.getProductsByCategory(categoryId).subscribe({
        next: (data) => this.filteredProducts = data,
        error: (err) => console.error('Error filtering products:', err)
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  searchProducts(query: string) {
    if (query.trim()) {
      this.productService.searchProducts(query).subscribe({
        next: (data) => this.filteredProducts = data,
        error: (err) => console.error('Error searching products:', err)
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  }
}