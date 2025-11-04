import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  productId = '';
  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => this.productId = params['id']);
  }
}
