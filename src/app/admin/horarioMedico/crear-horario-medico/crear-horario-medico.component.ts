import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MedicoService } from '../../../Services/Medico/medico.service';
import { HorarioService } from '../../../Services/Horario/horario.service';
import { HorarioMedicoService } from '../../../Services/HorarioMedico/horario-medico.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crear-horario-medico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  templateUrl: './crear-horario-medico.component.html',
  styleUrls: ['./crear-horario-medico.component.css'],
})
export class CrearHorarioMedicoComponent implements OnInit {
  medicos: { value: number; label: string }[] = [];
  especialidades: { value: number; label: string }[] = [];
  horarios: any[] = [];
  dias: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  diasMapeados: { value: string; label: string }[] = [];
  horariosFiltrados: any[] = [];
  selectedMedico: number | null = null;
  selectedEspecialidad: number | null = null;
  selectedDia: string | null = null;
  selectedHorarios: number[] = [];

  constructor(
    private horarioMedicoService: HorarioMedicoService,
    private horarioService: HorarioService,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMedicos();
    this.loadHorarios();
    this.mapDias(); // Llamada para mapear los días
  }

  // Método para mapear los días
  mapDias(): void {
    this.diasMapeados = this.dias.map((dia) => ({ value: dia, label: dia }));
  }

  loadMedicos(): void {
    this.medicoService.getAllMedicos().subscribe({
      next: (data) => {
        this.medicos = data.medicoList.map((medico: any) => ({
          value: medico.ci,
          label: medico.name,
        }));
        if (this.medicos.length > 0) {
          this.selectedMedico = this.medicos[0].value; // Seleccionar el primer médico por defecto
          setTimeout(
            () => this.loadEspecialidades(this.selectedMedico ?? 1),
            0
          ); // Cargar especialidades dinámicamente
        }
      },
      error: (err) => {
        console.error('Error al cargar médicos:', err);
      },
    });
  }

  loadEspecialidades(medicoCi: number): void {
    this.medicoService.getByCiMedico(medicoCi).subscribe({
      next: (data) => {
        if (data?.medico?.listaEspecialidades) {
          this.especialidades = data.medico.listaEspecialidades.map(
            (especialidad: any) => ({
              value: especialidad.id,
              label: especialidad.nombre,
            })
          );
          if (this.especialidades.length > 0) {
            this.selectedEspecialidad = this.especialidades[0].value; // Seleccionar la primera especialidad por defecto
          }
        } else {
          console.warn('Estructura de respuesta inesperada:', data);
          this.especialidades = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
      },
    });
  }

  loadHorarios(): void {
    this.horarioService.getAllHorarios().subscribe({
      next: (data) => {
        this.horarios = data.horarioList; // Suponiendo que la respuesta tiene "horarioList"
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
      },
    });
  }

  onMedicoChange(): void {
    if (this.selectedMedico) {
      this.loadEspecialidades(this.selectedMedico);
    }
  }

  onDiaChange(): void {
    this.horariosFiltrados = this.horarios.filter(
      (horario) =>
        horario.dia.toUpperCase().trim() ===
        (this.selectedDia || '').toUpperCase().trim()
    );
    this.selectedHorarios = []; // Reiniciar selección de horarios
  }

  onSubmit(): void {
    if (
      !this.selectedMedico ||
      !this.selectedEspecialidad ||
      !this.selectedDia ||
      this.selectedHorarios.length === 0
    ) {
      this.snackBar.open('Por favor, complete todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const payload = {
      ci_medico: this.selectedMedico,
      id_especialidad: this.selectedEspecialidad,
      id_horarios: this.selectedHorarios,
    };

    this.horarioMedicoService.createHorarioMedico(payload).subscribe({
      next: () => {
        this.snackBar.open('Horario creado exitosamente.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/admin/ver-horarioMedico']);
      },
      error: (err) => {
        console.error('Error al crear horario:', err);
        this.snackBar.open(
          'Error al crear horario. Inténtelo de nuevo.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
      },
    });
  }
}
