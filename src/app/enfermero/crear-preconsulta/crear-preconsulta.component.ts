import { Component } from '@angular/core';
import { CustomSelectComponent } from '../../Components/custom-select/custom-select.component';
import { FichaService } from '../../Services/Ficha/ficha.service';
import { Fecha } from '../../Services/Fecha';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createPreconsultaSchema } from '../../Services/Preconsulta/preconsulta.dto';
import { CustomInputComponent } from '../../Components/custom-input/custom-input.component';
import { SubmitButtonComponent } from '../../Components/submit-button/submit-button.component';
import { PreconsultaService } from '../../Services/Preconsulta/preconsulta.service';

@Component({
  selector: 'app-crear-preconsulta',
  standalone: true,
  imports: [
    CustomSelectComponent,
    ReactiveFormsModule,
    CustomInputComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './crear-preconsulta.component.html',
  styleUrl: './crear-preconsulta.component.css',
})
export class CrearPreconsultaComponent {
  form: FormGroup;
  options: { value: number; label: string }[] = [];
  selectedOption: any;

  estadoConfig = {
    label: 'Estado',
    type: 'text',
    errorMessages: {
      required: 'Este campo es obligatorio',
    },
  };

  pesoConfig = {
    label: 'Peso',
    type: 'number',
    errorMessages: {
      required: 'Este campo es obligatorio',
      min: 'Peso no puede ser negativo',
    },
  };

  alturaConfig = {
    label: 'Altura',
    type: 'number',
    errorMessages: {
      required: 'Este campo es obligatorio',
      min: 'Altura no puede ser negativa',
    },
  };

  edadConfig = {
    label: 'Edad',
    type: 'number',
    errorMessages: {
      required: 'Este campo es obligatorio',
      min: 'Edad no puede ser negativa',
    },
  };

  sexoConfig = {
    label: 'Sexo',
    type: 'text',
    errorMessages: {
      required: 'Este campo es obligatorio',
    },
  };

  presionConfig = {
    label: 'Presión',
    type: 'text',
    errorMessages: {
      required: 'Este campo es obligatorio',
    },
  };

  get estadoControl(): FormControl {
    return this.form.get('estado') as FormControl;
  }

  get pesoControl(): FormControl {
    return this.form.get('peso') as FormControl;
  }

  get alturaControl(): FormControl {
    return this.form.get('altura') as FormControl;
  }

  get edadControl(): FormControl {
    return this.form.get('edad') as FormControl;
  }

  get sexoControl(): FormControl {
    return this.form.get('sexo') as FormControl;
  }

  get presionControl(): FormControl {
    return this.form.get('presion') as FormControl;
  }

  get ciEnfermeroControl(): FormControl {
    return this.form.get('ci_enfermero') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private fichaService: FichaService,
    private fechaService: Fecha,
    private snackBar: MatSnackBar,
    private preconsultaService: PreconsultaService
  ) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      altura: ['', [Validators.required, Validators.min(0)]],
      edad: ['', [Validators.required, Validators.min(0)]],
      sexo: ['', Validators.required],
      presion: ['', Validators.required],
      ci_enferemero: [
        parseInt(localStorage.getItem('ci') || '0'),
        Validators.required,
      ],
      id_Ficha: ['', Validators.required],
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
          //.filter((ficha) => ficha.fechaAtencion === today) // Filtrar por fecha actual
          //quitar el comentario por el filter cuando no sea finde
          .map((ficha) => ({
            value: ficha.id,
            label: `${ficha.nombrePaciente} - ${ficha.horaAtencion} - ${ficha.fechaAtencion}`,
          }));
      },
      error: (error) => {
        console.error('Error al cargar las fichas:', error);
      },
    });
  }

  handleSelectionChange(value: any) {
    this.form.get('id_Ficha')?.setValue(value);
  }

  submitPreconsulta() {
    const formData = {
      ...this.form.value,
      peso: parseFloat(this.form.value.peso),
      altura: parseFloat(this.form.value.altura),
      edad: parseInt(this.form.value.edad, 10),
    };

    const validation = createPreconsultaSchema.safeParse(formData);

    if (!validation.success) {
      this.snackBar.open('Error en los datos ingresados.', 'Cerrar', {
        duration: 3000,
      });
      console.error(validation.error);
      return;
    }

    // Lógica para enviar los datos (simulada aquí)
    console.log('Preconsulta creada:', formData);
    this.snackBar.open('Preconsulta creada exitosamente!', 'Cerrar', {
      duration: 3000,
    });
    this.preconsultaService.createPreconsulta(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Ficha creada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        console.log(response);
        //todo: usar el navigate
      },
      error: (err) => {
        this.snackBar.open('Error al crear la ficha', 'Cerrar', {
          duration: 3000,
        });
        console.error(err);
      },
    });
  }
}
