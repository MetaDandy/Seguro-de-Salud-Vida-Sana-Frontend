import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import {
  CreateConsulta,
  createConsultaSchema,
  GetAllConsulta,
  getAllConsultaSchema,
  GetByIdConsulta,
  getByIdConsultaSchema,
} from './consulta.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  createConsulta(consulta: CreateConsulta): Observable<GetByIdConsulta> {
    const consultaValidation = createConsultaSchema.safeParse(consulta);
    console.log(consulta);

    if (!consultaValidation.success)
      throw new Error('Los datos de la consulta no tienen el formato esperado');

    return this.http
      .post<CreateConsulta>(`${this.url}/consulta/create`, consulta)
      .pipe(
        map((response) => {
          const result = getByIdConsultaSchema.safeParse(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );

          return result.data;
        })
      );
  }

  getAllConsulta(): Observable<GetAllConsulta> {
    return this.http.get<GetAllConsulta>(`${this.url}/consulta/getAll`).pipe(
      map((response) => {
        const result = getAllConsultaSchema.safeParse(response);
        if (!result.success)
          throw new Error(
            'La respuesta del servidor no tiene el formato esperado'
          );
        return result.data;
      })
    );
  }

  historial(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/consulta/historial/${id}`);
  }
}
