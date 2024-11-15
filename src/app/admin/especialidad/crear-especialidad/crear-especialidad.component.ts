import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EspecialidadService } from '../../../Services/Especialidad/especialidad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-especialidad',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Incluye los módulos necesarios como MatInputModule, MatButtonModule, etc.
  templateUrl: './crear-especialidad.component.html',
  styleUrls: ['./crear-especialidad.component.css'],
})
export class CrearEspecialidadComponent {
  especialidadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Creación del formulario con validaciones
    this.especialidadForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  // Método para enviar el formulario y crear la especialidad
  crearEspecialidad() {
    if (this.especialidadForm.valid) {
      const especialidadData = this.especialidadForm.value;

      this.especialidadService.createEspecialidad(especialidadData).subscribe({
        next: (response) => {
          // Mostrar mensaje de éxito
          this.snackBar.open('Especialidad creada con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['bg-green-600', 'text-white'],
          });

          // Redirigir a la lista de especialidades
          this.router.navigate(['/admin/ver-especialidad']);
        },
        error: (error) => {
          // Mostrar mensaje de error
          this.snackBar.open('Error al crear la especialidad', 'Cerrar', {
            duration: 3000,
            panelClass: ['bg-red-600', 'text-white'],
          });
        },
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos', 'Cerrar', {
        duration: 3000,
        panelClass: ['bg-yellow-600', 'text-white'],
      });
    }
  }
}
