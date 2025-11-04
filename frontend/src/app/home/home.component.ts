import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductsListComponent } from '../products/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, ProductsListComponent],
  template: `
    <app-carousel [images]="carouselImages"></app-carousel>
    <app-products-list></app-products-list>
  `
})
export class HomeComponent {
  carouselImages = [
    'assets/banner1.jpg',
    'assets/banner2.jpg',
    'assets/banner3.jpg'
  ];
}
