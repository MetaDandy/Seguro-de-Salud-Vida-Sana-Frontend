import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private url = environment.apiurl;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    const token = localStorage.getItem('token'); // Obtener el token del local storage
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .post(`${this.url}/login/logout`, {}, { headers, responseType: 'text' })
        .subscribe({
          next: () => {
            // Limpiar el token y otros datos relacionados con el usuario
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
            localStorage.removeItem('sub');
            localStorage.removeItem('iat');
            localStorage.removeItem('exp');
            localStorage.removeItem('ci'); // Si almacenas otros datos, elimínalos también
            // Redirigir al usuario a la pantalla de login
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Error al hacer logout:', err);
          },
        });
    } else {
      console.error('No se encontró un token en el local storage');
    }
  }
}
