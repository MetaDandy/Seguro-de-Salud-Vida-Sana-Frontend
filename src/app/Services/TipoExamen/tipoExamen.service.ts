import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  GetAllTipoExamen,
  getAllTipoExamenSchema,
  CreateTipoExamen,
  GetByIdTipoExamen,
  getByIdTipoExamenSchema,
  tipoExmanSchema,
} from './tipoExamen.dto';

@Injectable({
  providedIn: 'root',
})
export class TipoExamenService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  getAllTipoExamen(): Observable<GetAllTipoExamen> {
    return this.http
      .get<GetAllTipoExamen>(`${this.url}/tipo_examen/getAll`)
      .pipe(
        map((response) => {
          const result = getAllTipoExamenSchema.safeParse(response);
          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );
          return result.data;
        })
      );
  }

  createTipoExamen(
    tipoExamen: CreateTipoExamen
  ): Observable<GetByIdTipoExamen> {
    console.log(tipoExamen);

    const tipoExamenValidation = tipoExmanSchema.safeParse(tipoExamen);
    if (!tipoExamenValidation.success)
      throw new Error('Los datos de la consulta no tienen el formato esperado');

    return this.http
      .post<CreateTipoExamen>(`${this.url}/tipo_examen/create`, tipoExamen)
      .pipe(
        map((response) => {
          console.log(response);

          const result = getByIdTipoExamenSchema.safeParse(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );

          return result.data;
        })
      );
  }
}
