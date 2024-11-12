// ver-consulta.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ConsultaService } from '../../Services/Consulta/consulta.service';
import { GetAllConsulta } from '../../Services/Consulta/consulta.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-consulta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './ver-consulta.component.html',
  styleUrls: ['./ver-consulta.component.css'],
  providers: [ConsultaService],
})
export class VerConsultaComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'diagnostico',
    'nombrePaciente',
    'examenes',
    'analisis',
  ];
  dataSource = new MatTableDataSource<GetAllConsulta['consultaList'][number]>(
    []
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit() {
    this.loadConsultas();
  }

  loadConsultas() {
    const ciMedico = localStorage.getItem('ci');
    this.consultaService.getAllConsulta().subscribe({
      next: (response) => {
        this.dataSource.data = response.consultaList;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error al obtener las consultas:', error);
      },
    });
  }
}
