import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PacienteService } from '../../../Services/Paciente/paciente.service';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css'],
})
export class CrearPacienteComponent {
  pacienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.pacienteForm = this.fb.group({
      ci: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      const pacienteData = this.pacienteForm.value;

      this.pacienteService.createPaciente(pacienteData).subscribe({
        next: () => {
          this.snackBar.open('Paciente creado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin/ver-paciente']);
        },
        error: (err) => {
          console.error('Error al crear el paciente:', err);
          this.snackBar.open(
            'Error al crear el paciente. Intenta nuevamente.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    } else {
      this.snackBar.open(
        'Por favor completa correctamente todos los campos.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    }
  }
}
