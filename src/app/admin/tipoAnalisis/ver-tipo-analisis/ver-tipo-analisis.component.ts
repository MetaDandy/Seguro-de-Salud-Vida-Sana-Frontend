import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TipoAnalisisService } from '../../../Services/TipoAnalisis/tipoAnalisis.service';
import { CreateTipoAnalisis } from '../../../Services/TipoAnalisis/tipoAnalisis.dto';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-ver-tipo-analisis',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './ver-tipo-analisis.component.html',
  styleUrls: ['./ver-tipo-analisis.component.css'],
})
export class VerTipoAnalisisComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'costo'];
  dataSource = new MatTableDataSource<CreateTipoAnalisis>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tipoAnalisisService: TipoAnalisisService) {}

  ngOnInit() {
    this.tipoAnalisisService.getAllTipoAnalisis().subscribe({
      next: (response) => {
        this.dataSource.data = response.tipoAnalisisList;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.error('Error al obtener los análisis:', error),
    });
  }
}
