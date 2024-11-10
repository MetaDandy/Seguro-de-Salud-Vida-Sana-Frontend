import { Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { EnfermeroComponent } from './enfermero/enfermero.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ObtenerFichaComponent } from './paciente/obtener-ficha/obtener-ficha.component';

export const routes: Routes = [
  {
    path: 'login', // Especifica el segmento de ruta como 'login'
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: '', // Ruta raíz que redirecciona a 'login'
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdministradorComponent,
  },
  {
    path: 'enfermero',
    component: EnfermeroComponent,
  },
  {
    path: 'medico',
    component: MedicoComponent,
  },
  {
    path: 'paciente',
    component: PacienteComponent,
    children: [
      {
        path: 'obtener-ficha',
        component: ObtenerFichaComponent,
      },
    ],
  },
];
