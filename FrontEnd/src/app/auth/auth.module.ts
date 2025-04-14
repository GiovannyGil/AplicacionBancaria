import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecordarUsuarioComponent } from './recordar-usuario/recordar-usuario.component';
import { ReestablecerClaveComponent } from './reestablecer-clave/reestablecer-clave.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecordarUsuarioComponent,
    ReestablecerClaveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
