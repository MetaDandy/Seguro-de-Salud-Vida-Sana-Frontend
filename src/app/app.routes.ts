import { Routes } from '@angular/router';
import { EnfermeroComponent } from './enfermero/enfermero.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ObtenerFichaComponent } from './paciente/obtener-ficha/obtener-ficha.component';
import { VerFichasComponent } from './paciente/ver-fichas/ver-fichas.component';
import { CrearPreconsultaComponent } from './enfermero/crear-preconsulta/crear-preconsulta.component';
import { VerPreconsultaComponent } from './enfermero/ver-preconsulta/ver-preconsulta.component';
import { CrearConsultaComponent } from './medico/crear-consulta/crear-consulta.component';
import { VerConsultaComponent } from './medico/ver-consulta/ver-consulta.component';
import { AdminComponent } from './admin/admin.component';
import { CrearTipoExamenComponent } from './admin/crear-tipo-examen/crear-tipo-examen.component';

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
    component: AdminComponent,
    children: [
      {
        path: 'crear-tipoExamen',
        component: CrearTipoExamenComponent,
      },
    ],
  },
  {
    path: 'enfermero',
    component: EnfermeroComponent,
    children: [
      {
        path: 'crear-preconsulta',
        component: CrearPreconsultaComponent,
      },
      {
        path: 'ver-preconsulta',
        component: VerPreconsultaComponent,
      },
    ],
  },
  {
    path: 'medico',
    component: MedicoComponent,
    children: [
      {
        path: 'crear-consulta',
        component: CrearConsultaComponent,
      },
      {
        path: 'ver-consulta',
        component: VerConsultaComponent,
      },
    ],
  },
  {
    path: 'paciente',
    component: PacienteComponent,
    children: [
      {
        path: 'obtener-ficha',
        component: ObtenerFichaComponent,
      },
      {
        path: 'ver-ficha',
        component: VerFichasComponent,
      },
    ],
  },
];
