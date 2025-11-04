import { Component } from '@angular/core';
import { ProductsListComponent } from './products/products-list/products-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
