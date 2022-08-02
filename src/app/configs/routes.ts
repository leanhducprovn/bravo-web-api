import { ExecuteComponent } from '../pages/bravowebapi/execute/execute.component';
import { ProductComponent } from '../pages/bravowebapi/product/product.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { MainComponent } from '../pages/main/main.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const RoutesConfig = {
  login: {
    path: 'login',
    data: {
      title: 'Login',
    },
    component: LoginComponent,
  },

  404: {
    path: '404',
    data: {
      title: 'The page you’re looking for was not found!',
    },
    component: PageNotFoundComponent,
  },

  error: {
    path: '**',
    redirectTo: '/404',
  },

  main: {
    path: '',
    data: {
      title: 'Bravo Web API',
    },
    children: [
      {
        path: '',
        data: {
          title: 'Home',
        },
        component: HomeComponent,
      },
      {
        path: 'execute',
        data: {
          title: 'Execute',
        },
        component: ExecuteComponent,
      },
      {
        path: 'product',
        data: {
          title: 'Product',
        },
        component: ProductComponent,
      },
    ],
    component: MainComponent,
  },
};

export default RoutesConfig;
