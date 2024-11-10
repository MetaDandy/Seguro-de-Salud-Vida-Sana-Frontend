import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GetAllPreconsulta } from '../../Services/Preconsulta/preconsulta.dto';
import { PreconsultaService } from '../../Services/Preconsulta/preconsulta.service';

@Component({
  selector: 'app-ver-preconsulta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './ver-preconsulta.component.html',
  styleUrls: ['./ver-preconsulta.component.css'],
})
export class VerPreconsultaComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'estado',
    'peso',
    'altura',
    'edad',
    'presion',
    'nombreEnfermero',
  ];
  dataSource = new MatTableDataSource<
    GetAllPreconsulta['preconsultaList'][number]
  >([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private preconsultaService: PreconsultaService) {}

  ngOnInit(): void {
    this.loadPreconsultas();
  }

  loadPreconsultas() {
    const ciEnfermero = localStorage.getItem('ci');
    if (ciEnfermero) {
      this.preconsultaService.getAllPreconsulta().subscribe({
        next: (response) => {
          const preconsultas = response.preconsultaList.filter(
            (preconsulta) =>
              preconsulta.ci_enferemero === parseInt(ciEnfermero, 10)
          );
          this.dataSource.data = preconsultas;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => console.error('Error al cargar preconsultas:', err),
      });
    } else {
      console.error('CI del enfermero no encontrado en el local storage.');
    }
  }
}
