import { Routes, RouterModule, Router } from '@angular/router';
import { AuthService } from './pages/login/login.service';

export const routes: Routes = [

];


if (window.localStorage.getItem("access_token")) {

    // this.router.navigateByUrl(`/pages/dashboard`);
    routes.push({ path: '', redirectTo: 'pages/dashboard', pathMatch: 'full' })

    // this.authService.getParentInfo().then(user => {
    //   this.authService.storeParentData(user);
    // });

  } else {
    routes.push({ path: '', redirectTo: 'login', pathMatch: 'full' })
  }






export const routing = RouterModule.forRoot(routes, { useHash: true });
