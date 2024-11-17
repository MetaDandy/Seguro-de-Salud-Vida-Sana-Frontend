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
import { Router } from '@angular/router';

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
    private fecha: Fecha,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPreconsultas();
  }

  loadPreconsultas() {
    this.preconsultaService.getAllPreconsulta().subscribe({
      next: (response: GetAllPreconsulta) => {
        // Filtrar preconsultas ya utilizadas
        this.options = response.preconsultaList
          .filter((preconsulta) => !preconsulta.preconsultaTerminada)
          .map((preconsulta) => ({
            value: preconsulta.id,
            label: `${preconsulta.ficha.nombrePaciente} - ${preconsulta.estado} - ${preconsulta.ficha.nombreEspecialidad}`,
          }));
        console.log(response);
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
        this.router.navigate(['medico/ver-consulta']);
        this.snackBar.open('Consulta creada exitosamente', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Error al crear la consulta:', error);
      },
    });
  }
}
/**
 * TODO: Hacer que se filtren las preconsultas por el dia actual
 */
