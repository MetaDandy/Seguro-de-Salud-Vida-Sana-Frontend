import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HorarioService } from '../../../Services/Horario/horario.service'; // Asegúrate de que el servicio esté importado
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-horario',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css'],
})
export class CrearHorarioComponent {
  horarioForm: FormGroup;

  dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']; // Días de la semana

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Inicializamos el formulario con validaciones
    this.horarioForm = this.fb.group({
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      dia: ['', [Validators.required]],
    });
  }

  // Método para crear un horario
  createHorario(): void {
    if (this.horarioForm.invalid) {
      this.snackBar.open(
        'Por favor complete todos los campos correctamente.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const horarioData = this.horarioForm.value;

    // Llamamos al servicio para crear el horario
    this.horarioService.createHorario(horarioData).subscribe({
      next: (response) => {
        this.snackBar.open('Horario creado con éxito.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/admin/ver-horario']); // Redirigimos a la vista de horarios
      },
      error: (error) => {
        console.error('Error al crear el horario:', error);
        this.snackBar.open(
          'Error al crear el horario. Intenta nuevamente.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  // Método para validar que la hora de fin es al menos 15 minutos después de la hora de inicio
  validateHoraFin(): boolean {
    const horaInicio = this.horarioForm.get('horaInicio')?.value;
    const horaFin = this.horarioForm.get('horaFin')?.value;

    if (horaInicio && horaFin) {
      const [horaInicioHoras, horaInicioMinutos] = horaInicio
        .split(':')
        .map(Number);
      const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);

      const horaInicioDate = new Date();
      horaInicioDate.setHours(horaInicioHoras, horaInicioMinutos);

      const horaFinDate = new Date();
      horaFinDate.setHours(horaFinHoras, horaFinMinutos);

      const diferencia =
        (horaFinDate.getTime() - horaInicioDate.getTime()) / (1000 * 60); // Convertir la diferencia a minutos

      return diferencia >= 15 && diferencia <= 30;
    }

    return false;
  }
}
