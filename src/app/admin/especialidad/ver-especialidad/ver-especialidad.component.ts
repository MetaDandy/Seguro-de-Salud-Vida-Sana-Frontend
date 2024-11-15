import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EspecialidadService } from '../../../Services/Especialidad/especialidad.service';

@Component({
  selector: 'app-ver-especialidad',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './ver-especialidad.component.html',
  styleUrls: ['./ver-especialidad.component.css'],
})
export class VerEspecialidadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private especialidadService: EspecialidadService) {}

  ngOnInit() {
    this.especialidadService.getAllEspecialidades().subscribe({
      next: (response) => {
        this.dataSource.data = response.especialidadList;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) =>
        console.error('Error al obtener la lista de especialidades:', error),
    });
  }
}
