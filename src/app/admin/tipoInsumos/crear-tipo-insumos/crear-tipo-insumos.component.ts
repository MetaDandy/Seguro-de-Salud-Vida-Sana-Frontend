import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { TipoInsumoService } from '../../../Services/TipoInsumo/tipoInsumo.service';
import { CreateTipoInsumo } from '../../../Services/TipoInsumo/tipoInsumo.dto';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-tipo-insumos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-tipo-insumos.component.html',
  styleUrls: ['./crear-tipo-insumos.component.css'],
})
export class CrearTipoInsumosComponent {
  tipoInsumoForm: FormGroup;
  private snackBar = inject(MatSnackBar);
  private tipoInsumoService = inject(TipoInsumoService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.tipoInsumoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.tipoInsumoForm.valid) {
      const nuevoTipoInsumo: CreateTipoInsumo = this.tipoInsumoForm.value;

      this.tipoInsumoService.createTipoAnalisis(nuevoTipoInsumo).subscribe({
        next: () => {
          this.snackBar.open('Tipo de insumo creado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin/ver-TipoInsumo']);
        },
        error: (error) => {
          console.error('Error al crear tipo de insumo:', error);
          this.snackBar.open(
            'Hubo un error al crear el tipo de insumo. Intente nuevamente.',
            'Cerrar',
            { duration: 3000 }
          );
        },
      });
    }
  }
}
