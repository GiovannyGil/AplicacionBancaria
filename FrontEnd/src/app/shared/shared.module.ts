import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarAuthenticateComponent } from './navbar-authenticate/navbar-authenticate.component';



@NgModule({
  declarations: [ NavbarComponent, NavbarAuthenticateComponent ],
  imports: [ CommonModule, RouterModule, FontAwesomeModule ],
  exports: [ NavbarComponent, FontAwesomeModule, NavbarAuthenticateComponent ],
})
export class SharedModule { }
