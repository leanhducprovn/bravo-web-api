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
    ],
    component: MainComponent,
  },
};

export default RoutesConfig;
