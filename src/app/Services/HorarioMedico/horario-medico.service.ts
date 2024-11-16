import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetHorarioMedico, getHorarioMedicoSchema } from './horario-medico.dto';

@Injectable({
  providedIn: 'root',
})
export class HorarioMedicoService {
  private url = environment.apiurl;
  private route = 'horario_medico';

  constructor(private http: HttpClient) {}

  getHorarios(): Observable<GetHorarioMedico> {
    return this.http.get<any[]>(`${this.url}/${this.route}/getAll`).pipe(
      map((response) => {
        const result = getHorarioMedicoSchema.safeParse(response);

        if (!result.success)
          throw new Error(
            'La respuesta del servidor no tiene el formato esperado'
          );

        return result.data;
      })
    );
  }

  createHorarioMedico(data: any): Observable<any> {
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
