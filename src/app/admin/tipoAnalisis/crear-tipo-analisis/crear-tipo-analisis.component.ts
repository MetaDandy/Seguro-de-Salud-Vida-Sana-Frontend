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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TipoAnalisisService } from '../../../Services/TipoAnalisis/tipoAnalisis.service';
import { CreateTipoAnalisis } from '../../../Services/TipoAnalisis/tipoAnalisis.dto';

@Component({
  selector: 'app-crear-tipo-analisis',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './crear-tipo-analisis.component.html',
  styleUrls: ['./crear-tipo-analisis.component.css'],
})
export class CrearTipoAnalisisComponent {
  analisisForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoAnalisisService: TipoAnalisisService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.analisisForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      costo: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.analisisForm.valid) {
      const analisisData: CreateTipoAnalisis = this.analisisForm.value;
      this.tipoAnalisisService.createTipoAnalisis(analisisData).subscribe({
        next: (response) => {
          this.snackBar.open('Análisis creado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin/ver-TipoAnalisis']);
        },
        error: (error) => {
          this.snackBar.open('Error al crear el análisis', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al crear el análisis:', error);
        },
      });
    } else {
      this.analisisForm.markAllAsTouched();
    }
  }
}
