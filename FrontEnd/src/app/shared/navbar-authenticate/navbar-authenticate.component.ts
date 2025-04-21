import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar-authenticate',
  templateUrl: './navbar-authenticate.component.html',
  styleUrls: ['./navbar-authenticate.component.css']
})
export class NavbarAuthenticateComponent {
  userRol: string = '';

  ngOnInit() {
    this.userRol = localStorage.getItem('rolId') || '';
  }

  constructor(private authService: AuthService, private router: Router) {}

  cerrarSesion(): void {
    this.authService.logout();
  }

  esAdmin(): boolean {
    return this.userRol === 'Administrador';
  }

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
