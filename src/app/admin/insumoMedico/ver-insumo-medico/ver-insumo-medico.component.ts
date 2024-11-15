import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { InsumoMedicoService } from '../../../Services/InsumoMedico/insumoMedico.service';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ver-insumo-medico',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './ver-insumo-medico.component.html',
  styleUrls: ['./ver-insumo-medico.component.css'],
})
export class VerInsumoMedicoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'costo',
    'tipoInsumo',
    /* 'acciones', */
  ];
  dataSource = new MatTableDataSource<any>([]);
  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(private insumoMedicoService: InsumoMedicoService) {}

  ngOnInit(): void {
    this.loadInsumos();
  }

  // Cargar insumos médicos
  loadInsumos(): void {
    this.insumoMedicoService.getAllInsumosMedicos().subscribe({
      next: (response) => {
        const insumos = response.insumoMedicoList;
        this.dataSource.data = insumos;
        this.totalItems = insumos.length;
      },
      error: (error) => {
        console.error('Error al cargar insumos médicos:', error);
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
