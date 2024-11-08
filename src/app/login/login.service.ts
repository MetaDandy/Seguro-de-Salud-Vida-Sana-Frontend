import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from './login.dto';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api: string = enviroment.apiurl;

  constructor(private http: HttpClient) {}

  login(login: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.api}/login/admin`, login);
  }
}
