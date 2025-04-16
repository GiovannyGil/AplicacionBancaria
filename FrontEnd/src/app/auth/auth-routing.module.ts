import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordarUsuarioComponent } from './recordar-usuario/recordar-usuario.component';
import { ReestablecerClaveComponent } from './reestablecer-clave/reestablecer-clave.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta para el componente de inicio de sesión
  { path: 'register', component: RegisterComponent }, // Ruta para el componente de registro
  { path: 'recuperarUsuario', component: RecordarUsuarioComponent}, // Ruta para el componente de recuperar usuario
  {path: 'reestablecerClave', component: ReestablecerClaveComponent}, // Ruta para el componente de recordar contraseña
  { path: '**', redirectTo: '' }, // Redirige a la página de inicio de sesión para cualquier otra ruta no definida
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
