import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'complaints', loadChildren: () => System.import('./complaints/complaint.module') },
      { path: 'view-complaint/status/:statusId', loadChildren: () => System.import('./viewcomplaint/view-complaint.module') },
      { path: 'view-complaint/category/:categoryId', loadChildren: () => System.import('./viewcomplaint/view-complaint.module') },
      { path: 'view-complaint/category-status/:categoryId/:statusId', loadChildren: () => System.import('./viewcomplaint/view-complaint.module') },
      //{ path: 'components', loadChildren: () => System.import('./components/components.module') }
      { path: 'appreciations', loadChildren: () => System.import('./appreciations/appreciation.module') },
      { path: 'suggestions', loadChildren: () => System.import('./suggestions/suggestion.module') },
      { path: 'poll', loadChildren: () => System.import('./poll/poll.module') },
      { path: 'reportIssue', loadChildren: () => System.import('./reportIssue/reportIssue.module') },
      { path: 'addParent', loadChildren: () => System.import('./addParent/addParent.module') },
      { path: 'addManagement', loadChildren: () => System.import('./addManagement/addManagement.module') },
      { path: 'studentRating', loadChildren: () => System.import('./addManagement/addManagement.module') }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
