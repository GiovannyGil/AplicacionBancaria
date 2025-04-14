import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorrosRoutingModule } from './ahorros-routing.module';
import { AhorrosCreateComponent } from './ahorros-create/ahorros-create.component';
import { AhorrosListComponent } from './ahorros-list/ahorros-list.component';
import { AhorrosEditComponent } from './ahorros-edit/ahorros-edit.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AhorrosCreateComponent,
    AhorrosListComponent,
    AhorrosEditComponent
  ],
  imports: [
    CommonModule,
    AhorrosRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class AhorrosModule { }
