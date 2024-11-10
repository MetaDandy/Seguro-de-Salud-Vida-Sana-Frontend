import { Component } from '@angular/core';
import { LayoutComponent } from '../Components/layout/layout.component';

@Component({
  selector: 'app-enfermero',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './enfermero.component.html',
})
export class EnfermeroComponent {
  menuItems = [
    { label: 'Inicio', route: '/home' },
    { label: 'Perfil', route: '/profile' },
    { label: 'Configuración', route: '/settings' },
  ];
}
