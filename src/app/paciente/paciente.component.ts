import { Component } from '@angular/core';
import { LayoutComponent } from '../Components/layout/layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
})
export class PacienteComponent {
  menuItems = [
    { label: 'Obtener ficha', route: '/paciente/obtener-ficha' },
    { label: 'Ver ficha', route: '/paciente/ver-ficha' },
  ];
}
