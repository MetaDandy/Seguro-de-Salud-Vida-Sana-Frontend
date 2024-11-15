import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EnfermeroService } from '../../../Services/Enfermero/enfermero.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-enfermero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './crear-enfermero.component.html',
  styleUrls: ['./crear-enfermero.component.css'],
})
export class CrearEnfermeroComponent {
  enfermeroForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private enfermeroService: EnfermeroService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.enfermeroForm = this.fb.group({
      ci: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.enfermeroForm.invalid) {
      this.snackBar.open(
        'Por favor, llena todos los campos correctamente.',
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
        }
      );
      return;
    }

    this.isLoading = true;
    const enfermeroData = this.enfermeroForm.value;

    this.enfermeroService.createEnfermero(enfermeroData).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Enfermero creado exitosamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
        this.router.navigate(['/admin/ver-enfermero']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al crear el enfermero:', err);
        this.snackBar.open(
          'Ocurrió un error al crear el enfermero.',
          'Cerrar',
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
          }
        );
      },
    });
  }
}
