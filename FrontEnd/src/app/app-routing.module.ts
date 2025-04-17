import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'inicio', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule), canActivate: [AuthGuard]  }, // Página principal -> Dashboard (despues de logearse)
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [LoginGuard] }, // Autenticación -> Login y Register
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [AuthGuard]  }, // Página de usuarios
  { path: 'tarjetas', loadChildren: () => import('./tarjetas/tarjetas.module').then(m => m.TarjetasModule), canActivate: [AuthGuard]  }, // Página de tarjetas
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule), canActivate: [AuthGuard]  }, // Página de roles
  { path: 'gastos', loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosModule), canActivate: [AuthGuard]  }, // Página de gastos
  { path: 'ingresos', loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosModule), canActivate: [AuthGuard]  }, // Página de ingresos
  { path: 'creditos', loadChildren: () => import('./creditos/creditos.module').then(m => m.CreditosModule), canActivate: [AuthGuard]  }, // Página de créditos
  { path: 'ahorros', loadChildren: () => import('./ahorros/ahorros.module').then(m => m.AhorrosModule), canActivate: [AuthGuard] }, // Página de ahorros
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] }, // Página de ahorros
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
