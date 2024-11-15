import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TipoInsumoService } from '../../../Services/TipoInsumo/tipoInsumo.service';
import {
  createTipoInsumoSchema,
  GetByIdTipoInsumo,
} from '../../../Services/TipoInsumo/tipoInsumo.dto';

@Component({
  selector: 'app-ver-tipo-insumos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './ver-tipo-insumos.component.html',
  styleUrls: ['./ver-tipo-insumos.component.css'],
})
export class VerTipoInsumosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tipoInsumoService: TipoInsumoService) {}

  ngOnInit() {
    this.tipoInsumoService.getAllTipoAnalisis().subscribe({
      next: (response) => {
        this.dataSource.data = response.tipoInsumoList;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) =>
        console.error('Error al obtener los tipos de insumo:', error),
    });
  }
}
