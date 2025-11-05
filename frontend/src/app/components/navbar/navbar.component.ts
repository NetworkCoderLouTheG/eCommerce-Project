import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a routerLink="/" class="navbar-brand">PC Parts Store</a>
        <ul class="navbar-nav">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/products">Products</a></li>
          <li><a routerLink="/cart">Cart</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #1a1a2e;
      padding: 1rem;
    }
    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }
    .navbar-brand {
      color: #4ecca3;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }
    .navbar-nav {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }
    .navbar-nav a {
      color: white;
      text-decoration: none;
    }
  `]
})
export class NavbarComponent {
}