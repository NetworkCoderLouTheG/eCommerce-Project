import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ProductsListComponent },
      { path: 'cart', component: CartComponent },
      { path: 'about', component: AboutComponent },
      { path: 'product/:id', component: ProductDetailComponent }
    ]
  }
];
