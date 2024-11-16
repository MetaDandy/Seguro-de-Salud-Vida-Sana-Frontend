import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private url = environment.apiurl;
  private route = 'medico';

  constructor(private http: HttpClient) {}

  getAllMedicos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<any>(`${this.url}/${this.route}/getAll`, { headers })
      .pipe(
        map((response) => {
          console.log('Datos obtenidos:', response);
          return response;
        })
      );
  }

  getByCiMedico(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<any>(`${this.url}/${this.route}/getbyCi/${id}`, { headers })
      .pipe(
        map((response) => {
          console.log('Datos obtenidos:', response);
          return response;
        })
      );
  }

  createMedico(data: any): Observable<any> {
    console.log(data);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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
