import { Routes, RouterModule }  from '@angular/router';

import { AddParent } from './addParent.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AddParent,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
