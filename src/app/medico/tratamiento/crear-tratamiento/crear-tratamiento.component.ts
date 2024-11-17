import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TratamientoService } from '../../../Services/Tratamiento/tratamiento.service';
import { ConsultaService } from '../../../Services/Consulta/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CheckInsumoMedicoComponent } from './check-insumo-medico/check-insumo-medico.component';

@Component({
  selector: 'app-crear-tratamiento',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    CheckInsumoMedicoComponent,
  ],
  templateUrl: './crear-tratamiento.component.html',
  styleUrls: ['./crear-tratamiento.component.css'],
})
export class CrearTratamientoComponent implements OnInit {
  form: FormGroup;
  consultas: any[] = []; // Lista de consultas obtenidas del servicio
  insumoTratamiento: any[] = []; // Datos emitidos desde CheckInsumoMedicoComponent

  constructor(
    private fb: FormBuilder,
    private tratamientoService: TratamientoService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      id_consulta: [null, Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadConsultas();
  }

  // Cargar consultas filtradas
  loadConsultas(): void {
    this.consultaService.getAllConsulta().subscribe({
      next: (response) => {
        // Filtrar solo consultas no terminadas
        this.consultas = response.consultaList.filter(
          (consulta: any) => !consulta.consultaTerminada
        );
        console.log(this.consultas);
      },
      error: (err) => {
        console.error('Error al cargar consultas:', err);
      },
    });
  }

  // Manejar los datos emitidos desde CheckInsumoMedicoComponent
  onInsumoTratamientoChange(insumoTratamiento: any[]): void {
    this.insumoTratamiento = insumoTratamiento;
  }

  // Crear tratamiento
  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open(
        'Por favor complete todos los campos correctamente.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const tratamientoData = {
      ...this.form.value,
      insumoTratamiento: this.insumoTratamiento,
    };

    this.tratamientoService.createInsumoMedico(tratamientoData).subscribe({
      next: () => {
        this.snackBar.open('Tratamiento creado exitosamente.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/medico/ver-tratamiento']);
      },
      error: (err) => {
        console.error('Error al crear el tratamiento:', err);
        this.snackBar.open(
          'Error al crear el tratamiento. Intente nuevamente.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }
}
