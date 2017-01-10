import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './complaint.component';
import { routing }  from './complaint.routing';
import {ModalModule} from 'ng2-bootstrap/ng2-bootstrap';
import {MomentModule} from 'angular2-moment';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SimpleNotificationsModule } from 'angular2-notifications';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    ModalModule,
    InfiniteScrollModule,
    Ng2SearchPipeModule,
    SimpleNotificationsModule,
    MomentModule
  ],
  declarations: [

    Dashboard
  ],
  providers: [

  ]
})
export default class DashboardModule { }
