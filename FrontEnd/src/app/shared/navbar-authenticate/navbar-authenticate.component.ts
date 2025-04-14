import { Component } from '@angular/core';

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

  esAdmin(): boolean {
    return this.userRol === 'Administrador';
  }
}
