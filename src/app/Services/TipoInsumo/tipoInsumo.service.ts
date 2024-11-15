import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateTipoInsumo,
  createTipoInsumoSchema,
  GetAllTipoInsumo,
  getAllTipoInsumoSchema,
  GetByIdTipoInsumo,
  getByIdTipoInsumoSchema,
} from './tipoInsumo.dto';

@Injectable({
  providedIn: 'root',
})
export class TipoInsumoService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  getAllTipoAnalisis(): Observable<GetAllTipoInsumo> {
    return this.http
      .get<GetAllTipoInsumo>(`${this.url}/tipo_insumo/getAll`)
      .pipe(
        map((response) => {
          const result = getAllTipoInsumoSchema.safeParse(response);
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
    tipoExamen: CreateTipoInsumo
  ): Observable<GetByIdTipoInsumo> {
    console.log(tipoExamen);

    const tipoExamenValidation = createTipoInsumoSchema.safeParse(tipoExamen);
    if (!tipoExamenValidation.success)
      throw new Error('Los datos de la consulta no tienen el formato esperado');

    return this.http
      .post<CreateTipoInsumo>(`${this.url}/tipo_insumo/create`, tipoExamen)
      .pipe(
        map((response) => {
          console.log(response);

          const result = getByIdTipoInsumoSchema.safeParse(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );

          return result.data;
        })
      );
  }
}
