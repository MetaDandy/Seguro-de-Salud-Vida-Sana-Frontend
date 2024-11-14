import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TipoExamenService } from '../../Services/TipoExamen/tipoExamen.service';
import { CreateTipoExamen } from '../../Services/TipoExamen/tipoExamen.dto';

@Component({
  selector: 'app-crear-tipo-examen',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './crear-tipo-examen.component.html',
  styleUrls: ['./crear-tipo-examen.component.css'],
})
export class CrearTipoExamenComponent {
  examForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoExamenService: TipoExamenService
  ) {
    this.examForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      costo: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const examData: CreateTipoExamen = this.examForm.value;
      this.tipoExamenService.createTipoExamen(examData).subscribe({
        next: (response) => {
          console.log('Examen creado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al crear el examen:', error);
        },
      });
    } else {
      this.examForm.markAllAsTouched(); // Muestra los errores en todos los campos
    }
  }
}
