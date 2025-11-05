import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Add more here if needed
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // use the standard class name!
  // Remove signals unless required for your UI
  title = 'frontend';
}
