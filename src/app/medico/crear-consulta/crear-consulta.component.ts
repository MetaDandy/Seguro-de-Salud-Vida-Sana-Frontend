import { Component } from '@angular/core';
import { CustomSelectComponent } from '../../Components/custom-select/custom-select.component';
import { PreconsultaService } from '../../Services/Preconsulta/preconsulta.service';
import { ConsultaService } from '../../Services/Consulta/consulta.service';
import { GetAllPreconsulta } from '../../Services/Preconsulta/preconsulta.dto';
import { TipoAnalisisSelectorComponent } from './tipo-analisis-selector/tipo-analisis-selector.component';
import { CreateConsulta } from '../../Services/Consulta/consulta.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Fecha } from '../../Services/Fecha';

@Component({
  selector: 'app-crear-consulta',
  standalone: true,
  imports: [
    CustomSelectComponent,
    TipoAnalisisSelectorComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './crear-consulta.component.html',
  styleUrls: ['./crear-consulta.component.css'],
})
export class CrearConsultaComponent {
  options: { value: number; label: string }[] = [];
  selectedOption: number | null = null;
  selectedAnalisis: any[] = [];
  selectedExamenes: any[] = [];
  diagnostico: string = '';

  constructor(
    private preconsultaService: PreconsultaService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private fecha: Fecha
  ) {}

  ngOnInit(): void {
    this.loadPreconsultas();
  }

  loadPreconsultas() {
    this.preconsultaService.getAllPreconsulta().subscribe({
      next: (response: GetAllPreconsulta) => {
        // Filtrar preconsultas ya utilizadas
        const usedPreconsultas = this.getUsedPreconsultas();
        this.options = response.preconsultaList
          .filter((preconsulta) => !usedPreconsultas.includes(preconsulta.id))
          .map((preconsulta) => ({
            value: preconsulta.id,
            label: `${preconsulta.enfermero.name} - ${preconsulta.estado}`,
          }));
      },
      error: (error) => {
        console.error('Error al cargar las preconsultas:', error);
      },
    });
  }

  handleSelectionChange(value: number) {
    this.selectedOption = value;
  }

  handleAnalisisChange(analisis: any[]) {
    this.selectedAnalisis = analisis;
  }

  handleExamenesChange(examenes: any[]) {
    this.selectedExamenes = examenes;
  }

  createConsulta() {
    if (!this.selectedOption || !this.diagnostico) {
      console.error(
        'Debe seleccionar una preconsulta y completar el diagnóstico'
      );
      return;
    }

    const consulta: CreateConsulta = {
      fecha: this.fecha.obtenerFechaLocal(),
      diagnostico: this.diagnostico,
      id_preconsulta: this.selectedOption,
      analisis: this.selectedAnalisis,
      examen: this.selectedExamenes,
    };

    this.consultaService.createConsulta(consulta).subscribe({
      next: (response) => {
        this.snackBar.open('Consulta creada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.saveUsedPreconsulta(this.selectedOption!); // Guardar la preconsulta usada
      },
      error: (error) => {
        console.error('Error al crear la consulta:', error);
      },
    });
  }

  saveUsedPreconsulta(id: number) {
    const usedPreconsultas = this.getUsedPreconsultas();
    if (!usedPreconsultas.includes(id)) {
      usedPreconsultas.push(id);
      localStorage.setItem(
        'usedPreconsultas',
        JSON.stringify(usedPreconsultas)
      );
    }
  }

  getUsedPreconsultas(): number[] {
    return JSON.parse(localStorage.getItem('usedPreconsultas') || '[]');
  }
}
/**
 * TODO: Hacer que se filtren las preconsultas por el dia actual
 * Hacer el navigate a ver consultas
 * Hacer ver consultas
 * Proxys con angular y netifly
 */
