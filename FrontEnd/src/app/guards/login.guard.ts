import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const loggedIn = await this.authService.isLoggedIn();
    if (loggedIn) {
      this.router.navigate(['/inicio']); // Redirigir si ya está logueado
      return false;
    }
    return true; // Permitir acceso si NO está logueado
  }
}