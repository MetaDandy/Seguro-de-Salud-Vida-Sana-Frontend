import { Component } from '@angular/core';
import { LayoutComponent } from '../Components/layout/layout.component';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
})
export class PacienteComponent {
  menuItems = [
    { label: 'Obtener ficha', route: '/paciente/obtener-ficha' },
    { label: 'Ver ficha', route: '/paciente/ver-ficha' },
    { label: 'Historial', route: '/paciente/historial' },
  ];
}
