import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateFicha,
  createFichaSchema,
  GetAllFicha,
  getAllFichaSchema,
  GetByIdFicha,
  getByIdFichaSchema,
} from './ficha.dto';

@Injectable({
  providedIn: 'root',
})
export class FichaService {
  private url = environment.apiurl;

  constructor(private http: HttpClient) {}

  createFicha(ficha: CreateFicha): Observable<GetByIdFicha> {
    const fichaValidation = createFichaSchema.safeParse(ficha);
    if (!fichaValidation.success) {
      throw new Error('Los datos de la ficha no tienen el formato esperado');
    }

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Configurar los encabezados de la solicitud con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<CreateFicha>(`${this.url}/ficha/create`, ficha, { headers })
      .pipe(
        map((response) => {
          const result = getByIdFichaSchema.safeParse(response);

          if (!result.success)
            throw new Error(
              'La respuesta del servidor no tiene el formato esperado'
            );

          return result.data;
        })
      );
  }

  getAllFicha(): Observable<GetAllFicha> {
    return this.http.get<GetAllFicha>(`${this.url}/ficha/getAll`).pipe(
      map((response) => {
        const result = getAllFichaSchema.safeParse(response);
        if (!result.success)
          throw new Error(
            'La respuesta del servidor no tiene el formato esperado'
          );

        return result.data;
      })
    );
  }
}
