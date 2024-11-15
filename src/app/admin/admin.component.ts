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
    { label: 'Crear insumos medicos', route: '/admin/crear-insumoMedico' },
    { label: 'Ver insumos medicos', route: '/admin/ver-insumoMedico' },
    { label: 'Crear especialidad', route: '/admin/crear-especialidad' },
    { label: 'Ver especialidad', route: '/admin/ver-especialidad' },
    { label: 'Crear horario', route: '/admin/crear-horario' },
    { label: 'Ver horario', route: '/admin/ver-horario' },
    { label: 'Crear paciente', route: '/admin/crear-paciente' },
    { label: 'Ver paciente', route: '/admin/ver-paciente' },
    { label: 'Crear enfermero', route: '/admin/crear-enfermero' },
    { label: 'Ver enfermero', route: '/admin/ver-enfermero' },
    { label: 'Crear medico', route: '/admin/crear-medico' },
    { label: 'Ver medico', route: '/admin/ver-medico' },
  ];
}
