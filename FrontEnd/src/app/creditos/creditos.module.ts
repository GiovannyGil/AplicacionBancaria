import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosCreateComponent } from './creditos-create/creditos-create.component';
import { CreditosListComponent } from './creditos-list/creditos-list.component';
import { CreditosEditComponent } from './creditos-edit/creditos-edit.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreditosCreateComponent,
    CreditosListComponent,
    CreditosEditComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class CreditosModule { }
