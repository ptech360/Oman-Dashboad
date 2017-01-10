import { Routes, RouterModule }  from '@angular/router';

import { AddManagement } from './addManagement.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AddManagement,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
