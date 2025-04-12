import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) }, // Página principal -> Dashboard (despues de logearse)
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Autenticación -> Login y Register
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) }, // Página de usuarios
  { path: 'tarjetas', loadChildren: () => import('./tarjetas/tarjetas.module').then(m => m.TarjetasModule) }, // Página de tarjetas
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) }, // Página de roles
  { path: 'gastos', loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosModule) }, // Página de gastos
  { path: 'ingresos', loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosModule) }, // Página de ingresos
  { path: 'creditos', loadChildren: () => import('./creditos/creditos.module').then(m => m.CreditosModule) }, // Página de créditos
  { path: 'ahorros', loadChildren: () => import('./ahorros/ahorros.module').then(m => m.AhorrosModule) }, // Página de ahorros
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
