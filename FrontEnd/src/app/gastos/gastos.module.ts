import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosCreateComponent } from './gastos-create/gastos-create.component';
import { GastosEditComponent } from './gastos-edit/gastos-edit.component';
import { GastosListComponent } from './gastos-list/gastos-list.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    GastosCreateComponent,
    GastosEditComponent,
    GastosListComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class GastosModule { }
