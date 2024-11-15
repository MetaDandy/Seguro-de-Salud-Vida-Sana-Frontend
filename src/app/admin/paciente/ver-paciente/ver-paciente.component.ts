import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../Services/Paciente/paciente.service';

@Component({
  selector: 'app-ver-paciente',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css'],
})
export class VerPacienteComponent implements OnInit {
  displayedColumns: string[] = ['ci', 'name', 'birthDate', 'email'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.fetchPacientes();
  }

  fetchPacientes(): void {
    this.pacienteService.getAllPacientes().subscribe({
      next: (response) => {
        this.dataSource.data = response.pacienteList;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener los pacientes:', err);
        this.isLoading = false;
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
