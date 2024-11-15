import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private url = environment.apiurl;
  private route = 'horario';

  constructor(private http: HttpClient) {}

  getAllHorarios(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Añadir el token al encabezado

    return this.http
      .get<any>(`${this.url}/${this.route}/getAll`, { headers })
      .pipe(
        map((response) => {
          console.log('Datos obtenidos:', response);
          return response;
        })
      );
  }

  createHorario(data: any): Observable<any> {
    console.log(data);

    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Añadir el token al encabezado

    return this.http
      .post<any>(`${this.url}/${this.route}/create`, data, { headers })
      .pipe(
        map((response) => {
          console.log('Especialidad creada:', response);
          return response;
        })
      );
  }
}
