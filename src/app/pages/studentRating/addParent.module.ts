import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { AddParent } from './addParent.component';
import { routing } from './addParent.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [

    AddParent
  ],
  providers: [
  ]
})
export default class DashboardModule { }
