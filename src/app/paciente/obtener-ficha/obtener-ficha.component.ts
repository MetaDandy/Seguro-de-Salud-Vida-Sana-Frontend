import { Component, OnInit } from '@angular/core';
import { HorarioMedicoService } from '../../Services/HorarioMedico/horario-medico.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FichaService } from '../../Services/Ficha/ficha.service';
import { Fecha } from '../../Services/Fecha';
import { Router } from '@angular/router';

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
    private fichaService: FichaService,
    private fecha: Fecha,
    private router: Router
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
    const fechaAtencion = this.fecha.calcularFechaAtencion(horario.dia);

    // Crear la ficha
    const ficha = {
      fechaEmision: this.fecha.obtenerFechaLocal(),
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
        this.router.navigate(['/paciente/ver-ficha']);
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
}
