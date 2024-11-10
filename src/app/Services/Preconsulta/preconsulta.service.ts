import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import {
  CreatePreconsulta,
  createPreconsultaSchema,
  GetByIdPreconsulta,
  getByIdPreconsultaSchema,
} from './preconsulta.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreconsultaService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  createPreconsulta(
    preconsulta: CreatePreconsulta
  ): Observable<GetByIdPreconsulta> {
    const preconsultaValidation =
      createPreconsultaSchema.safeParse(preconsulta);
    if (!preconsultaValidation.success)
      throw new Error(
        'Los datos de la preconsulta no tienen el formato esperado'
      );

    return this.http
      .post<CreatePreconsulta>(`${this.url}/preconsulta/create`, preconsulta)
      .pipe(
        map((response) => {
          const result = getByIdPreconsultaSchema.safeParse(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );

          return result.data;
        })
      );
  }
}
