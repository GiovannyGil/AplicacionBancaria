import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GastosComponent } from './gastos/gastos.component';
import { AhorrosComponent } from './ahorros/ahorros.component';
import { CreditosComponent } from './creditos/creditos.component';
import { DashComponent } from './dash/dash.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    GastosComponent,
    AhorrosComponent,
    CreditosComponent,
    DashComponent,
    TarjetasComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
