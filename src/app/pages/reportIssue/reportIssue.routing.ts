import { Routes, RouterModule }  from '@angular/router';

import { Dashboard } from './reportIssue.component';

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
