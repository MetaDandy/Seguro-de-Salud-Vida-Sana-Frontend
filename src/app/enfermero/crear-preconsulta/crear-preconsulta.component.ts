import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FichaService } from '../../Services/Ficha/ficha.service';
import { Fecha } from '../../Services/Fecha';
import { PreconsultaService } from '../../Services/Preconsulta/preconsulta.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-preconsulta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './crear-preconsulta.component.html',
  styleUrls: ['./crear-preconsulta.component.css'],
})
export class CrearPreconsultaComponent implements OnInit {
  form: FormGroup;
  options: { value: number; label: string }[] = [];
  sexOptions = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
  ];

  constructor(
    private fb: FormBuilder,
    private fichaService: FichaService,
    private fechaService: Fecha,
    private snackBar: MatSnackBar,
    private preconsultaService: PreconsultaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      altura: ['', [Validators.required, Validators.min(0)]],
      edad: ['', [Validators.required, Validators.min(0)]],
      sexo: ['', Validators.required],
      presion: ['', Validators.required],
      id_Ficha: ['', Validators.required],
      ci_enferemero: [
        parseInt(localStorage.getItem('ci') || '0'),
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.loadTodayFichas();
  }

  loadTodayFichas() {
    const today = this.fechaService.obtenerFechaLocal(); // Obtener la fecha actual

    this.fichaService.getAllFicha().subscribe({
      next: (response) => {
        this.options = response.fichaList
          .filter(
            (ficha) =>
              //ficha.fechaAtencion === today &&
              !ficha.fichaTerminada
          )
          .map((ficha) => ({
            value: ficha.id,
            label: `${ficha.nombrePaciente} - ${ficha.horaAtencion} - ${ficha.fechaAtencion} - ${ficha.nombreEspecialidad} - ${ficha.nombreMedico}`,
          }));
      },
      error: (error) => {
        console.error('Error al cargar las fichas:', error);
      },
    });
  }

  submitPreconsulta() {
    if (this.form.invalid) {
      this.snackBar.open(
        'Por favor, completa todos los campos correctamente.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    const formData = {
      ...this.form.value,
      peso: parseFloat(this.form.value.peso),
      altura: parseFloat(this.form.value.altura),
      edad: parseInt(this.form.value.edad, 10),
    };

    this.preconsultaService.createPreconsulta(formData).subscribe({
      next: () => {
        this.snackBar.open('Preconsulta creada exitosamente!', 'Cerrar', {
          duration: 3000,
        });

        this.router.navigate(['/enfermero/ver-preconsulta']);
      },
      error: (err) => {
        this.snackBar.open('Error al crear la ficha.', 'Cerrar', {
          duration: 3000,
        });
        console.error(err);
      },
    });
  }
}
