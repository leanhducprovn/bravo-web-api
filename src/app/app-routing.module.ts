import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import RoutesConfig from './configs/routes';

const routes: Routes = [
  {
    path: RoutesConfig.login.path,
    data: RoutesConfig.login.data,
    component: RoutesConfig.login.component,
  },
  {
    path: RoutesConfig.main.path,
    data: RoutesConfig.main.data,
    children: RoutesConfig.main.children,
    component: RoutesConfig.main.component,
  },
  {
    path: RoutesConfig[404].path,
    data: RoutesConfig[404].data,
    component: RoutesConfig[404].component,
  },
  {
    path: RoutesConfig.error.path,
    redirectTo: RoutesConfig.error.redirectTo,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
