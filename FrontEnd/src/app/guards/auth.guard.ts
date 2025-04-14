import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Asegúrate de tener este servicio
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const loggedIn = await this.authService.isLoggedIn();
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
