import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './Test/test/test.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Seguro-de-Salud-Vida-Sana';
  condition = true;
  ar = [1, 2, 3, 4];
}
