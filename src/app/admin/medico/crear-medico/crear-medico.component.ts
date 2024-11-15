import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EspecialidadService } from '../../../Services/Especialidad/especialidad.service';
import { MedicoService } from '../../../Services/Medico/medico.service';

@Component({
  selector: 'app-crear-medico',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css'],
})
export class CrearMedicoComponent implements OnInit {
  medicoForm!: FormGroup;
  especialidades: { id: number; nombre: string }[] = []; // Lista de especialidades disponibles
  selectedEspecialidades: string[] = []; // Especialidades seleccionadas

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEspecialidades();
  }

  // Inicializar formulario con validaciones
  initializeForm(): void {
    this.medicoForm = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Cargar especialidades desde el servicio
  loadEspecialidades(): void {
    this.especialidadService.getAllEspecialidades().subscribe({
      next: (response) => {
        this.especialidades = response.especialidadList; // Adaptar al formato de respuesta
      },
      error: (error) => {
        console.error('Error al cargar especialidades:', error);
        this.snackBar.open('Error al cargar especialidades', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  // Manejar creación del médico
  onSubmit(): void {
    if (this.medicoForm.invalid) {
      this.snackBar.open(
        'Por favor complete todos los campos correctamente.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    const formData = {
      ...this.medicoForm.value,
      especialidades: this.selectedEspecialidades,
    };

    this.medicoService.createMedico(formData).subscribe({
      next: () => {
        this.snackBar.open('Médico creado exitosamente.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/admin/ver-medico']); // Redirigir a la lista de médicos
      },
      error: (error) => {
        console.error('Error al crear médico:', error);
        this.snackBar.open('Error al crear el médico.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  // Manejar selección de especialidades
  toggleEspecialidad(especialidad: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedEspecialidades.push(especialidad);
    } else {
      this.selectedEspecialidades = this.selectedEspecialidades.filter(
        (item) => item !== especialidad
      );
    }
  }
}
