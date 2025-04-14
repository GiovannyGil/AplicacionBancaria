import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RolesCreateComponent,
    RolesListComponent,
    RolesEditComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SharedModule,
  ]
})
export class RolesModule { }
