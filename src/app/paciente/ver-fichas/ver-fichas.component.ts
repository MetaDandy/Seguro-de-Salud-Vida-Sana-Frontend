import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../Services/Ficha/ficha.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Fecha } from '../../Services/Fecha';

@Component({
  selector: 'app-ver-fichas',
  standalone: true,
  imports: [MatSnackBarModule, MatCardModule, CommonModule],
  templateUrl: './ver-fichas.component.html',
  styleUrl: './ver-fichas.component.css',
})
export class VerFichasComponent implements OnInit {
  fichasFuturas!: any;
  fichasPasadas!: any;
  ci_paciente: string = localStorage.getItem('ci') ?? '';

  constructor(
    private fichaService: FichaService,
    private snackBar: MatSnackBar,
    private fecha: Fecha
  ) {}

  ngOnInit(): void {
    this.fichaService.getAllFicha().subscribe(
      (data) => {
        const hoy = this.fecha.obtenerFechaLocal();
        console.log(data);

        this.fichasFuturas = data.fichaList.filter(
          (ficha) =>
            ficha.fechaAtencion >= hoy &&
            ficha.ci_paciente === Number(this.ci_paciente)
        );

        this.fichasPasadas = data.fichaList.filter(
          (ficha) =>
            ficha.fechaAtencion < hoy &&
            ficha.ci_paciente === Number(this.ci_paciente)
        );

        this.snackBar.open('Fichas cargadas correctamente', 'Cerrar', {
          duration: 5000,
        });
      },
      (error) => {
        this.snackBar.open('Error al cargar las fichas', 'Cerrar', {
          duration: 5000,
        });
        console.error(error);
      }
    );
  }
}
