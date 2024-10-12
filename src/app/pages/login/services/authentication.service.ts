import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username === 'admin@gmail.com' && password === '1234') {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

}
