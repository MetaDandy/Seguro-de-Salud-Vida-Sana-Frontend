import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TipoInsumoService } from '../../../Services/TipoInsumo/tipoInsumo.service';
import { InsumoMedicoService } from '../../../Services/InsumoMedico/insumoMedico.service';
import { CustomSelectComponent } from '../../../Components/custom-select/custom-select.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-insumo-medico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CustomSelectComponent,
    MatSnackBarModule,
  ],
  templateUrl: './crear-insumo-medico.component.html',
  styleUrls: ['./crear-insumo-medico.component.css'],
})
export class CrearInsumoMedicoComponent implements OnInit {
  insumoForm!: FormGroup;
  tipoInsumoOptions: { value: number; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private tipoInsumoService: TipoInsumoService,
    private insumoMedicoService: InsumoMedicoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTipoInsumos();
  }

  // Inicializa el formulario
  private initializeForm(): void {
    this.insumoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      costo: [null, [Validators.required, Validators.min(0)]],
      id_tipoInsumo: [null, Validators.required],
    });
  }

  // Carga las opciones de tipo de insumo
  private loadTipoInsumos(): void {
    this.tipoInsumoService.getAllTipoAnalisis().subscribe({
      next: (response) => {
        this.tipoInsumoOptions = response.tipoInsumoList.map((tipo) => ({
          value: tipo.id ?? 1,
          label: tipo.nombre,
        }));
      },
      error: (err) => {
        console.error('Error al cargar los tipos de insumo:', err);
      },
    });
  }

  // Enviar formulario
  onSubmit(): void {
    if (this.insumoForm.invalid) return;

    this.insumoMedicoService
      .createInsumoMedico(this.insumoForm.value)
      .subscribe({
        next: () => {
          console.log('Insumo médico creado exitosamente');
          this.snackBar.open('Insumo médico creado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin/ver-insumoMedico']);
        },
        error: (err) => {
          this.snackBar.open('Error al crear el Insumo médico', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al crear insumo médico:', err);
        },
      });
  }
}
