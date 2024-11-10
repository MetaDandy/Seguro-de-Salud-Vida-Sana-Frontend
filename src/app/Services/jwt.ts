import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { z } from 'zod';

const tokenSchema = z.object({
  sub: z.string().email(),
  roles: z.array(z.string()),
  iat: z.number(),
  exp: z.number(),
  ci: z.number(),
});

type tokenDto = z.infer<typeof tokenSchema>;

@Injectable({
  providedIn: 'root', // Esto hace que Angular registre el servicio en el root injector
})
export class Jwt {
  private jwtDecode: typeof jwt_decode;

  constructor() {
    this.jwtDecode = jwt_decode;
  }

  decodeToken(token: string) {
    try {
      const decodedToken: tokenDto = this.jwtDecode.jwtDecode(token);

      tokenSchema.parse(decodedToken);

      localStorage.setItem('sub', decodedToken.sub ?? '');
      localStorage.setItem('roles', decodedToken.roles[0] ?? '');
      localStorage.setItem('iat', decodedToken.iat?.toString() ?? '');
      localStorage.setItem('exp', decodedToken.exp?.toString() ?? '');
      localStorage.setItem('ci', decodedToken.ci?.toString() ?? '');

      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      throw new Error('Token invalido');
    }
  }
}
