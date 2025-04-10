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
    { label: 'Crear Tratamiento', route: '/medico/crear-tratamiento' },
    { label: 'Ver Tratamiento', route: '/medico/ver-tratamiento' },
    { label: 'Cancela ficha', route: '/medico/cancelar-ficha' },
  ];
}
