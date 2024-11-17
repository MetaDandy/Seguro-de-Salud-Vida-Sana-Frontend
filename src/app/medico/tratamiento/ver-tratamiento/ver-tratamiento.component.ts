import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TratamientoService } from '../../../Services/Tratamiento/tratamiento.service';

@Component({
  selector: 'app-ver-tratamiento',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './ver-tratamiento.component.html',
  styleUrls: ['./ver-tratamiento.component.css'],
})
export class VerTratamientoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'descripcion',
    'consultaId',
    'insumo',
    'cantidad',
    'costo',
  ]; // Columnas que se mostrarán en la tabla

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Uso del operador `!` para asegurarnos de que se inicializa
  @ViewChild(MatSort) sort!: MatSort; // Uso del operador `!`

  constructor(private tratamientoService: TratamientoService) {}

  ngOnInit(): void {
    this.loadTratamientos();
  }

  loadTratamientos(): void {
    this.tratamientoService.getAllInsumosMedicos().subscribe({
      next: (response: any) => {
        // Usamos 'any' para el tipo de respuesta
        const data: any[] = response.tratamientoList.flatMap(
          (tratamiento: any) => {
            // Tipado explícito de `tratamiento` y `insumo`
            return tratamiento.insumoTratamiento.map((insumo: any) => ({
              id: tratamiento.id,
              descripcion: tratamiento.descripcion,
              consultaId: tratamiento.id_consulta,
              insumo: insumo.insumoMedico.nombre,
              cantidad: insumo.cantidad,
              costo: insumo.costoTotal,
            }));
          }
        );
        this.dataSource.data = data; // Asignamos los datos procesados a la dataSource
      },
      error: (error: any) => {
        console.error('Error al cargar los tratamientos:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
