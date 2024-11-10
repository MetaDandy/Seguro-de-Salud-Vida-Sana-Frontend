import { Component, OnInit } from '@angular/core';
import { HorarioMedicoService } from '../../Services/HorarioMedico/horario-medico.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FichaService } from '../../Services/Ficha/ficha.service';

@Component({
  selector: 'app-obtener-ficha',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './obtener-ficha.component.html',
  styleUrl: './obtener-ficha.component.css',
})
export class ObtenerFichaComponent implements OnInit {
  horariosMedicos!: any;
  selectedHorario: string = '';
  ci_paciente: string = localStorage.getItem('ci') ?? '';

  constructor(
    private horarioMedicoService: HorarioMedicoService,
    private snackBar: MatSnackBar,
    private fichaService: FichaService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.horarioMedicoService.getHorarios().subscribe(
      (data) => {
        this.horariosMedicos = data;
        console.log(this.horariosMedicos);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUniqueHorarioId(item: any, horario: any): string {
    return `${item.ci_medico}-${horario.id}-${item.id_especialidad}`;
  }

  confirmarSeleccion(): void {
    const [ci_medico, id_horario, id_especialidad] =
      this.selectedHorario.split('-');

    // Encontrar el horario seleccionado
    const horario = this.findHorarioById(ci_medico, id_horario);

    // Calcular la fecha de atención según el día seleccionado
    const fechaAtencion = this.calcularFechaAtencion(horario.dia);

    // Crear la ficha
    const ficha = {
      fechaEmision: this.obtenerFechaLocal(),
      fechaAtencion: fechaAtencion,
      horaAtencion: horario.horaInicio,
      ci_paciente: Number(this.ci_paciente),
      ci_medico: Number(ci_medico),
      id_especialidad: Number(id_especialidad),
    };

    ficha.horaAtencion = ficha.horaAtencion.split(':').slice(0, 2).join(':');

    console.log(ficha);

    this.fichaService.createFicha(ficha).subscribe({
      next: (response) => {
        this.snackBar.open('Ficha creada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        console.log(response);
      },
      error: (err) => {
        this.snackBar.open('Error al crear la ficha', 'Cerrar', {
          duration: 3000,
        });
        console.error(err);
      },
    });
  }

  findHorarioById(ci_medico: string, id_horario: string): any {
    for (const item of this.horariosMedicos.horarioMedicoList) {
      if (item.ci_medico === Number(ci_medico)) {
        const horario = item.horarios.find(
          (horario: any) => horario.id === Number(id_horario)
        );
        if (horario) {
          console.log(horario);

          return horario;
        }
      }
    }
    console.error('Horario no encontrado', ci_medico, id_horario);
    return null; // Devuelve null si no se encuentra el horario
  }

  // Función para calcular la fecha de atención según el día seleccionado
  calcularFechaAtencion(dia: string): string {
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
  obtenerFechaLocal(): string {
    const today = new Date();
    return this.formatFechaLocal(today); // Formato YYYY-MM-DD
  }

  // Formatear la fecha a formato local
  formatFechaLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
