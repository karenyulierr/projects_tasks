import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HTTPErrorService {
  handleError(error: any): void {
    let message = 'Ocurrió un error inesperado.';
    if (error.error && error.error.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }
  }
}
