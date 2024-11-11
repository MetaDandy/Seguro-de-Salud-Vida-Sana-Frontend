import { Component } from '@angular/core';
import { LayoutComponent } from '../Components/layout/layout.component';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css',
})
export class MedicoComponent {
  menuItems = [
    { label: 'Crear Consulta', route: '/medico/crear-consulta' },
    { label: 'Ver Consulta', route: '/medico/ver-consulta' },
  ];
}
