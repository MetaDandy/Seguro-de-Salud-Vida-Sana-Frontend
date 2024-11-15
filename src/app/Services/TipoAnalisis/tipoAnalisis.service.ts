import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateTipoAnalisis,
  GetAllTipoAnalisis,
  getAllTipoAnalisisSchema,
  GetByIdTipoAnalisis,
  getByIdTipoAnalisisSchema,
  tipoAnalisisSchema,
} from './tipoAnalisis.dto';

@Injectable({
  providedIn: 'root',
})
export class TipoAnalisisService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  getAllTipoAnalisis(): Observable<GetAllTipoAnalisis> {
    return this.http
      .get<GetAllTipoAnalisis>(`${this.url}/tipo_analisis/getAll`)
      .pipe(
        map((response) => {
          const result = getAllTipoAnalisisSchema.safeParse(response);
          console.log(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );
          return result.data;
        })
      );
  }

  createTipoAnalisis(
    tipoExamen: CreateTipoAnalisis
  ): Observable<GetByIdTipoAnalisis> {
    console.log(tipoExamen);

    const tipoExamenValidation = tipoAnalisisSchema.safeParse(tipoExamen);
    if (!tipoExamenValidation.success)
      throw new Error('Los datos de la consulta no tienen el formato esperado');

    return this.http
      .post<CreateTipoAnalisis>(`${this.url}/tipo_analisis/create`, tipoExamen)
      .pipe(
        map((response) => {
          console.log(response);

          const result = getByIdTipoAnalisisSchema.safeParse(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );

          return result.data;
        })
      );
  }
}
