import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {Dashboard} from './view-complaint.component';
import { routing }  from './view-complaint.routing';
import {ChartService} from '../../services/chart.service';
@NgModule({
  imports: [
    CommonModule,
    routing
   
  ],
  declarations: [
    Dashboard
  ],
  providers: [
    ChartService
  ]
})
export default class ViewComplaintModule{}