import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginDto, LoginResponse, LoginResponseSchema } from './login.dto';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api: string = environment.apiurl;

  constructor(private http: HttpClient) {}

  login(login: LoginDto): Observable<LoginResponse> {
    return this.http.post<any>(`${this.api}/login/admin`, login).pipe(
      map((response) => {
        const result = LoginResponseSchema.safeParse(response);

        if (!result.success)
          throw new Error(
            'La respuesta del servidor no tiene el formato esperado'
          );

        localStorage.setItem('token', result.data.token);
        return result.data;
      })
    );
  }
}
