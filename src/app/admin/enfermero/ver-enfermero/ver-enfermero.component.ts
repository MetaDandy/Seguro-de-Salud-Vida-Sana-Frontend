import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EnfermeroService } from '../../../Services/Enfermero/enfermero.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ver-enfermero',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ver-enfermero.component.html',
  styleUrls: ['./ver-enfermero.component.css'],
})
export class VerEnfermeroComponent implements OnInit {
  displayedColumns: string[] = ['ci', 'name', 'age', 'birthDate', 'email'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = true; // Mostrar spinner mientras carga
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private enfermeroService: EnfermeroService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEnfermeros();
  }

  // Cargar enfermeros desde el servicio
  loadEnfermeros(): void {
    this.enfermeroService.getAllEnfermeros().subscribe({
      next: (response) => {
        this.dataSource.data = response.enfermeroList; // Ajustar según la estructura de la respuesta
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar enfermeros:', error);
        this.errorMessage = 'Error al cargar los datos. Intente nuevamente.';
        this.snackBar.open('Error al cargar los enfermeros.', 'Cerrar', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }

  // Filtro para la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
