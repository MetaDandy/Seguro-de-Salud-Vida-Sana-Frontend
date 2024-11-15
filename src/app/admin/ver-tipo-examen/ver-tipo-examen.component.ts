import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GetAllTipoExamen } from '../../Services/TipoExamen/tipoExamen.dto';
import { TipoExamenService } from '../../Services/TipoExamen/tipoExamen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-tipo-examen',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './ver-tipo-examen.component.html',
  styleUrls: ['./ver-tipo-examen.component.css'],
})
export class VerTipoExamenComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'fechaCreacion'];
  dataSource = new MatTableDataSource<
    GetAllTipoExamen['tipoExamenList'][number]
  >([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tipoExamenService: TipoExamenService) {}

  ngOnInit(): void {
    this.loadTipoExamenes();
  }

  loadTipoExamenes() {
    this.tipoExamenService.getAllTipoExamen().subscribe({
      next: (response) => {
        this.dataSource.data = response.tipoExamenList;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error al cargar tipos de examen:', err),
    });
  }
}
