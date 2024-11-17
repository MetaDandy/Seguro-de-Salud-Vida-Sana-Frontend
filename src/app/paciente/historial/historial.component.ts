import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConsultaService } from '../../Services/Consulta/consulta.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinner],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  historial: any = null;

  constructor(
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchHistorial();
  }

  fetchHistorial(): void {
    const ci = localStorage.getItem('ci');

    if (!ci) {
      this.snackBar.open(
        'No se encontró el identificador del paciente en el sistema.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const id = parseInt(ci, 10);

    this.consultaService.historial(id).subscribe({
      next: (response) => {
        this.historial = response.historail;
      },
      error: (err) => {
        console.error('Error al obtener el historial:', err);
        this.snackBar.open(
          'Hubo un problema al obtener el historial. Intente nuevamente.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  generatePDF(): void {
    if (!this.historial) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Historial Médico', 14, 20); // Título del PDF

    doc.setFontSize(12);
    doc.text(`ID Paciente: ${this.historial.id_paciente}`, 14, 30); // ID Paciente

    let currentY = 40; // Inicializamos el espacio para el primer bloque de información

    this.historial.consultas.forEach((consulta: any, index: number) => {
      if (index > 0) {
        doc.addPage(); // Añadir página para cada consulta después de la primera
        currentY = 20; // Reiniciamos el espacio en Y después de agregar la página
      }

      doc.setFontSize(14);
      doc.text(`Consulta ${index + 1}:`, 14, currentY); // Título de la consulta
      currentY += 10;

      // Fecha de consulta
      doc.setFontSize(12);
      doc.text(`Fecha: ${consulta.fecha}`, 14, currentY);
      currentY += 10;

      // Diagnóstico
      doc.text(`Diagnóstico: ${consulta.diagnostico}`, 14, currentY);
      currentY += 15;

      // Información de la Ficha
      if (consulta.preconsultaDto) {
        doc.setFontSize(12);
        doc.text('Ficha:', 14, currentY);
        currentY += 10;
        doc.text(
          `Fecha de Atención: ${consulta.preconsultaDto.ficha.fechaAtencion}`,
          14,
          currentY
        );
        currentY += 10;
        doc.text(
          `Hora de Atención: ${consulta.preconsultaDto.ficha.horaAtencion}`,
          14,
          currentY
        );
        currentY += 10;
        doc.text(
          `Especialidad: ${consulta.preconsultaDto.ficha.nombreEspecialidad}`,
          14,
          currentY
        );
        currentY += 15;
      }

      // Información de Exámenes
      if (consulta.examen.length > 0) {
        doc.text('Exámenes:', 14, currentY);
        currentY += 10; // Espacio antes de la tabla
        consulta.examen.forEach((e: any) => {
          doc.text(`Nombre: ${e.examen.nombre}`, 14, currentY);
          currentY += 6;
          doc.text(`Resultado: ${e.resultado}`, 14, currentY);
          currentY += 6;
          doc.text(`Costo: $${e.examen.costo}`, 14, currentY);
          currentY += 10; // Espacio después de cada examen
        });
      }

      // Información de Análisis
      if (consulta.analisis.length > 0) {
        doc.text('Análisis:', 14, currentY);
        currentY += 10; // Espacio antes de los análisis
        consulta.analisis.forEach((a: any) => {
          doc.text(`Nombre: ${a.analisis.nombre}`, 14, currentY);
          currentY += 6;
          doc.text(`Resultado: ${a.resultado}`, 14, currentY);
          currentY += 6;
          doc.text(`Costo: $${a.analisis.costo}`, 14, currentY);
          currentY += 10; // Espacio después de cada análisis
        });
      }

      // Información de Tratamientos
      if (consulta.tratamientos) {
        doc.text('Tratamientos:', 14, currentY);
        currentY += 10; // Espacio antes de los tratamientos
        doc.text(
          `Descripción: ${consulta.tratamientos.descripcion}`,
          14,
          currentY
        );
        currentY += 6;
        doc.text(`Fecha: ${consulta.tratamientos.fecha}`, 14, currentY);
        currentY += 15; // Espacio después de tratamientos
      }
    });

    // Guardar el PDF
    doc.save(`Historial_Paciente_${this.historial.id_paciente}.pdf`);
  }
}
