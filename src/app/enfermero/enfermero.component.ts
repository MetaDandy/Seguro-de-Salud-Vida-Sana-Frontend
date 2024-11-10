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
    { label: 'Creaer preconsulta', route: '/enferemero/crear-preconsulta' },
    { label: 'Ver preconsulta', route: '/enfermero/ver-preconsulta' },
  ];
}
