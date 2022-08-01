import { ExecuteComponent } from '../pages/bravowebapi/execute/execute.component';
import { ProductComponent } from '../pages/bravowebapi/product/product.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { MainComponent } from '../pages/main/main.component';

const RoutesConfig = {
  login: {
    path: 'login',
    data: {
      title: 'Login',
    },
    component: LoginComponent,
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
