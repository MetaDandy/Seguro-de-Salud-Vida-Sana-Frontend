import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../Services/Medico/medico.service';

@Component({
  selector: 'app-ver-medico',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './ver-medico.component.html',
  styleUrls: ['./ver-medico.component.css'],
})
export class VerMedicoComponent implements OnInit {
  displayedColumns: string[] = [
    'ci',
    'name',
    'age',
    'birthDate',
    'email',
    'especialidades',
  ];
  dataSource = new MatTableDataSource<any>([]);
  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.loadMedicos();
  }

  // Cargar médicos
  loadMedicos(): void {
    this.medicoService.getAllMedicos().subscribe({
      next: (response) => {
        const medicos = response.medicoList;
        this.dataSource.data = medicos;
        this.totalItems = medicos.length;
      },
      error: (error) => {
        console.error('Error al cargar médicos:', error);
      },
    });
  }

  // Manejar cambio de página
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator?.firstPage();
  }

  // Filtro de búsqueda
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
