import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { AddManagement } from './addManagement.component';
import { routing } from './addManagement.routing';
import { ValidationService } from '../../services/formValidation.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    SimpleNotificationsModule
  ],
  declarations: [
    AddManagement
  ],
  providers: [ValidationService]
})
export default class DashboardModule { }
