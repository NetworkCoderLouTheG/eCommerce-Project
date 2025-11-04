import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="site-main">
      <div class="site-container"><router-outlet></router-outlet></div>
    </main>
    <app-footer></app-footer>
  `
})
export class MainLayoutComponent {}
