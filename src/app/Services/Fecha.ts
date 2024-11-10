import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Fecha {
  // Función para calcular la fecha de atención según el día seleccionado
  public calcularFechaAtencion(dia: string): string {
    const today = new Date();
    const diasDeLaSemana = [
      'DOMINGO',
      'LUNES',
      'MARTES',
      'MIERCOLES',
      'JUEVES',
      'VIERNES',
      'SABADO',
    ];
    const dayIndex = diasDeLaSemana.indexOf(dia);

    if (dayIndex === -1) return ''; // Si el día no es válido

    const fechaAtencion = new Date(today);
    fechaAtencion.setDate(
      today.getDate() + ((dayIndex + 7 - today.getDay()) % 7)
    ); // Calcula la próxima fecha de ese día

    return this.formatFechaLocal(fechaAtencion); // Formato YYYY-MM-DD
  }

  // Función para obtener la fecha en formato local (no UTC)
  public obtenerFechaLocal(): string {
    const today = new Date();
    return this.formatFechaLocal(today); // Formato YYYY-MM-DD
  }

  // Formatear la fecha a formato local
  public formatFechaLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
