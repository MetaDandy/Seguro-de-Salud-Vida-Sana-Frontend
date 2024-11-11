import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SubmitButtonComponent } from '../../../Components/submit-button/submit-button.component';
import { TipoAnalisisService } from '../../../Services/TipoAnalisis/tipoAnalisis.service';
import { TipoExamenService } from '../../../Services/TipoExamen/tipoExamen.service';

@Component({
  standalone: true,
  selector: 'app-tipo-analisis-selector',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SubmitButtonComponent,
  ],
  templateUrl: './tipo-analisis-selector.component.html',
  styleUrls: ['./tipo-analisis-selector.component.css'],
})
export class TipoAnalisisSelectorComponent implements OnInit {
  tiposItems: any[] = [];
  form: FormGroup;

  @Output() analisisSeleccionadosOutput = new EventEmitter<any[]>();
  @Input() isAnalisis!: boolean;

  // Clave dinámica basada en el valor de isAnalisis
  private idKey!: string;

  constructor(
    private fb: FormBuilder,
    private tipoAnalisisService: TipoAnalisisService,
    private tipoExamenService: TipoExamenService
  ) {
    this.form = this.fb.group({
      analisisSeleccionados: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    if (this.isAnalisis) {
      this.tipoAnalisisService.getAllTipoAnalisis().subscribe((response) => {
        this.tiposItems = response.tipoAnalisisList;
      });
    } else {
      this.tipoExamenService.getAllTipoExamen().subscribe((response) => {
        this.tiposItems = response.tipoExamenList;
      });
    }

    // Configuramos la clave basada en isAnalisis
    this.idKey = this.isAnalisis ? 'id_tipoAnalisis' : 'id_tipoExamen';
  }

  get analisisSeleccionados(): FormArray<FormGroup> {
    return this.form.get('analisisSeleccionados') as FormArray<FormGroup>;
  }

  // Verifica si el tipo de análisis/examen está seleccionado en el FormArray
  isAnalisisSelected(id: number): boolean {
    return this.analisisSeleccionados.controls.some(
      (ctrl) => ctrl.value[this.idKey] === id
    );
  }

  // Método para manejar el cambio de estado del checkbox
  onCheckboxChange(item: any, event: MatCheckboxChange): void {
    const isChecked = event.checked;
    if (isChecked) {
      const itemGroup = this.fb.group({
        [this.idKey]: [item.id, Validators.required],
        resultado: ['', Validators.required],
        fecha: ['', Validators.required],
      });
      this.analisisSeleccionados.push(itemGroup);
    } else {
      const index = this.analisisSeleccionados.controls.findIndex(
        (ctrl) => ctrl.value[this.idKey] === item.id
      );
      if (index !== -1) {
        this.analisisSeleccionados.removeAt(index);
      }
    }
    this.analisisSeleccionadosOutput.emit(this.analisisSeleccionados.value);
  }

  onSubmit(): void {
    const analisisArray = this.analisisSeleccionados.value;
    console.log('Datos enviados:', analisisArray);
    this.analisisSeleccionadosOutput.emit(analisisArray);
  }

  // Función para obtener el valor del checked desde el FormArray
  getCheckboxChecked(id: number): boolean {
    return this.isAnalisisSelected(id);
  }

  // Función para obtener el FormGroup asociado al ID específico
  getAnalisisGroup(id: number): FormGroup | null {
    const index = this.analisisSeleccionados.controls.findIndex(
      (ctrl) => ctrl.value[this.idKey] === id
    );
    return index !== -1
      ? (this.analisisSeleccionados.at(index) as FormGroup)
      : null;
  }
}
