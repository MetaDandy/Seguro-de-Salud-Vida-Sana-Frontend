import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { InsumoMedicoService } from '../../../../Services/InsumoMedico/insumoMedico.service';

@Component({
  selector: 'app-check-insumo-medico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  templateUrl: './check-insumo-medico.component.html',
  styleUrls: ['./check-insumo-medico.component.css'],
})
export class CheckInsumoMedicoComponent implements OnInit {
  @Input() insumoMedicoList: any[] = []; // Si ya se recibe una lista
  @Output() insumoTratamientoOutput = new EventEmitter<any[]>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private insumoMedicoService: InsumoMedicoService // Servicio para obtener insumos
  ) {
    this.form = this.fb.group({
      insumoTratamiento: this.fb.array([]),
    });
  }

  addInsumoForm(insumo: any): void {
    const insumoGroup = this.fb.group({
      id_insumoMedico: [insumo.id, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]], // Inicia en 1 y no puede ser menor a 1
    });
    this.insumoTratamiento.push(insumoGroup);
  }

  // Manejar el cambio de estado del checkbox
  onCheckboxChange(item: any, event: MatCheckboxChange): void {
    const isChecked = event.checked;

    if (isChecked) {
      // Si está seleccionado, agregar al FormArray con cantidad inicial de 1
      this.addInsumoForm(item);
    } else {
      // Si está desmarcado, eliminar del FormArray
      const index = this.insumoTratamiento.controls.findIndex(
        (ctrl) => ctrl.value.id_insumoMedico === item.id
      );
      if (index !== -1) {
        this.insumoTratamiento.removeAt(index);
      }
    }

    // Emitir el estado actualizado
    this.emitInsumoTratamiento();
  }

  ngOnInit(): void {
    if (!this.insumoMedicoList || this.insumoMedicoList.length === 0) {
      // Si no se recibe lista como input, obtener desde el servicio
      this.insumoMedicoService.getAllInsumosMedicos().subscribe({
        next: (response) => {
          this.insumoMedicoList = response.insumoMedicoList; // Ajustar al formato de respuesta
          // No marcamos ningún insumo al inicio
        },
        error: (err) => {
          console.error('Error al cargar los insumos médicos:', err);
        },
      });
    }
  }

  populateForm(): void {
    this.insumoMedicoList.forEach((insumo) => {
      this.addInsumoForm(insumo);
    });
  }

  get insumoTratamiento(): FormArray<FormGroup> {
    return this.form.get('insumoTratamiento') as FormArray<FormGroup>;
  }

  // Verifica si el insumo está marcado
  isInsumoSelected(id: number): boolean {
    return this.insumoTratamiento.controls.some(
      (ctrl) => ctrl.value.id_insumoMedico === id
    );
  }

  // Método para emitir el objeto insumoTratamiento al componente padre
  emitInsumoTratamiento(): void {
    const insumoTratamientoArray = this.insumoTratamiento.value.map(
      (insumo) => ({
        id_insumoMedico: insumo.id_insumoMedico,
        cantidad: insumo.cantidad,
      })
    );
    this.insumoTratamientoOutput.emit(insumoTratamientoArray);
  }

  getInsumoControl(id: number): FormControl {
    const control = this.insumoTratamiento.controls.find(
      (ctrl) => ctrl.value.id_insumoMedico === id
    ) as FormGroup;

    // Retorna el FormControl para 'cantidad', si no existe crea uno vacío
    return control
      ? (control.get('cantidad') as FormControl)
      : this.fb.control('');
  }

  // Método para manejar el envío del formulario
  onSubmit(event: Event): void {
    event.stopPropagation(); // Detiene la propagación del evento hacia el padre
    const insumoTratamientoArray = this.insumoTratamiento.value.map(
      (insumo) => ({
        id_insumoMedico: insumo.id_insumoMedico,
        cantidad: insumo.cantidad,
      })
    );
    console.log('Insumos seleccionados:', insumoTratamientoArray);
    this.insumoTratamientoOutput.emit(insumoTratamientoArray);
  }
}
