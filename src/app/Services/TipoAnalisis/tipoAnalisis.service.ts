import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  GetAllTipoAnalisis,
  getAllTipoAnalisisSchema,
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
}
