import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .carousel { position: relative; width: 100%; max-width: 700px; margin: 30px auto; }
    .carousel img { width: 100%; height: 280px; object-fit: cover; border-radius: 12px; display: none; }
    .carousel img.active { display: block; }
    .carousel button { position: absolute; top: 50%; transform: translateY(-50%); background: #444; color: #fff; border: none; font-size: 24px; padding: 0 15px; cursor: pointer; opacity: 0.8; }
    .carousel button.prev { left: 0; }
    .carousel button.next { right: 0; }
  `],
  template: `
    <div class="carousel">
      <button class="prev" (click)="prev()">&#60;</button>
      <button class="next" (click)="next()">&#62;</button>
      <img *ngFor="let img of images; let i = index" [src]="img" [class.active]="i === activeIndex">
    </div>
  `
})
export class CarouselComponent {
  @Input() images: string[] = [];
  activeIndex = 0;

  prev() { this.activeIndex = (this.activeIndex + this.images.length - 1) % this.images.length; }
  next() { this.activeIndex = (this.activeIndex + 1) % this.images.length; }
}
