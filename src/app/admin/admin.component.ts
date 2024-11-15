import { Component } from '@angular/core';
import { LayoutComponent } from '../Components/layout/layout.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [LayoutComponent],
  template: `<app-layout [menuItems]="menuItems" />`,
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  menuItems = [
    { label: 'Crear Tipo de examen', route: '/admin/crear-tipoExamen' },
    { label: 'Ver tipo de examen', route: '/admin/ver-tipoExamen' },
    { label: 'Crear Tipo de analisis', route: '/admin/crear-TipoAnalisis' },
    { label: 'Ver tipo de analisis', route: '/admin/ver-TipoAnalisis' },
    { label: 'Crear Tipo de insumos', route: '/admin/crear-TipoInsumo' },
    { label: 'Ver tipo de insumos', route: '/admin/ver-TipoInsumo' },
  ];
}
