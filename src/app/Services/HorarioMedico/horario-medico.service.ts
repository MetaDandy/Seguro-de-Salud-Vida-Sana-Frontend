import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetHorarioMedico, getHorarioMedicoSchema } from './horario-medico.dto';

@Injectable({
  providedIn: 'root',
})
export class HorarioMedicoService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  getHorarios(): Observable<GetHorarioMedico> {
    return this.http.get<any[]>(`${this.url}/horario_medico/getAll`).pipe(
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
}
