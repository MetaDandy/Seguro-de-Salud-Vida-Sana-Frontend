import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private router: Router) {}

  getRole(): string | null {
    return localStorage.getItem('roles');
  }

  redirectByRole(): void {
    const role = this.getRole();

    if (role === 'ROLE_Administrador') this.router.navigate(['/admin']);
    else if (role === 'ROLE_Medico') this.router.navigate(['/medico']);
    else if (role === 'ROLE_Enfermero') this.router.navigate(['/enfermero']);
    else if (role === 'ROLE_Paciente') this.router.navigate(['/paciente']);
    else this.router.navigate(['/login']);
  }
}
