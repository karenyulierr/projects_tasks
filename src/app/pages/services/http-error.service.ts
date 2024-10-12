import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HTTPErrorService {
  constructor(private snackbar: MatSnackBar) {}

  handleError(error: any): void {
    let message = 'Ocurrió un error inesperado.';
    if (error.error && error.error.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }
    this.snackbar.open(message, 'Cerrar', {
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
      duration: 4000,
    });
  }
}
