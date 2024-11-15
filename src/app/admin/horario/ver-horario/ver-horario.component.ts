import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HorarioService } from '../../../Services/Horario/horario.service';

@Component({
  selector: 'app-ver-horario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './ver-horario.component.html',
  styleUrls: ['./ver-horario.component.css'],
})
export class VerHorarioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'horaInicio', 'horaFin', 'dia']; // Columnas a mostrar
  dataSource = new MatTableDataSource<any>(); // MatTableDataSource para la tabla de datos

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginador

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    // Obtener los horarios al cargar el componente
    this.horarioService.getAllHorarios().subscribe({
      next: (response) => {
        console.log('Horarios obtenidos:', response);
        this.dataSource.data = response.horarioList; // Llenar la tabla con los datos obtenidos
        this.dataSource.paginator = this.paginator; // Asignar el paginator a la tabla
      },
      error: (error) => console.error('Error al obtener los horarios:', error),
    });
  }
}
