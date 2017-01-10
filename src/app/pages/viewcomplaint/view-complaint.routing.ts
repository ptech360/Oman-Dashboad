import { Routes, RouterModule }  from '@angular/router';

// import { ViewComplaint } from './view-complaint.component';
import { Dashboard } from './view-complaint.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
