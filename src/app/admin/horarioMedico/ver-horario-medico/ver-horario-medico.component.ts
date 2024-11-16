import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { HorarioMedicoService } from '../../../Services/HorarioMedico/horario-medico.service';

@Component({
  selector: 'app-ver-horario-medico',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ver-horario-medico.component.html',
  styleUrls: ['./ver-horario-medico.component.css'],
})
export class VerHorarioMedicoComponent implements OnInit {
  displayedColumns: string[] = [
    'nombreMedico',
    'nombreEspecialidad',
    'dia',
    'horas',
  ];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;

  constructor(private horarioMedicoService: HorarioMedicoService) {}

  ngOnInit(): void {
    this.loadHorarios();
  }

  loadHorarios(): void {
    this.horarioMedicoService.getHorarios().subscribe({
      next: (data) => {
        const horarios = data.horarioMedicoList.flatMap((item) =>
          item.horarios.map((horario) => ({
            nombreMedico: item.nombreMedico,
            nombreEspecialidad: item.nombreEspecialidad,
            dia: horario.dia,
            horas: `${horario.horaInicio} - ${horario.horaFin}`,
          }))
        );

        this.dataSource.data = horarios;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los horarios:', err);
        this.isLoading = false;
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
