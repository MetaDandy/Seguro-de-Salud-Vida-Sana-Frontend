import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FichaService } from '../../Services/Ficha/ficha.service';

@Component({
  selector: 'app-cancelar-fichas',
  standalone: true,
  imports: [],
  template: `<div
    class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center"
  >
    <h2 class="text-xl font-bold text-red-600 mb-4">
      Cancelar todas las fichas
    </h2>
    <p class="text-gray-700 mb-6">
      Esta acción cancelará todas las fichas asociadas al médico actual.
      Asegúrese de querer continuar.
    </p>
    <button
      (click)="cancelFichas()"
      class="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
    >
      Cancelar Fichas
    </button>
  </div> `,
  styleUrls: ['./cancelar-fichas.component.css'],
})
export class CancelarFichasComponent {
  constructor(
    private fichaService: FichaService,
    private snackBar: MatSnackBar
  ) {}

  cancelFichas(): void {
    const ci = localStorage.getItem('ci'); // Obtener el id del médico desde localStorage

    if (!ci) {
      this.snackBar.open(
        'No se encontró el identificador del médico en el sistema.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const id = parseInt(ci, 10); // Convertir el id a número
    if (isNaN(id)) {
      this.snackBar.open(
        'El identificador del médico no es válido.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    // Confirmación antes de cancelar las fichas
    const confirmCancel = window.confirm(
      '¿Está seguro que desea cancelar todas sus fichas? Esta acción no se puede deshacer.'
    );
    if (!confirmCancel) return;

    this.fichaService.cancelFicha(id).subscribe({
      next: () => {
        this.snackBar.open(
          'Todas las fichas han sido canceladas con éxito.',
          'Cerrar',
          { duration: 3000 }
        );
      },
      error: (err) => {
        console.error('Error al cancelar las fichas:', err);
        this.snackBar.open(
          'Hubo un problema al cancelar las fichas. Intente nuevamente.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }
}
