import { ExecuteComponent } from '../pages/bravowebapi/execute/execute.component';
import { ProductComponent } from '../pages/bravowebapi/product/product.component';
import { ElearningMainComponent } from '../pages/elearning/elearning-main/elearning-main.component';
import { ElearningComponent } from '../pages/elearning/elearning.component';
import { UnsubscribeComponent } from '../pages/elearning/unsubscribe/unsubscribe.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { MainComponent } from '../pages/main/main.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { DogComponent } from '../pages/pictures/dog/dog.component';
import { PicturesMainComponent } from '../pages/pictures/pictures-main/pictures-main.component';
import { PicturesComponent } from '../pages/pictures/pictures.component';

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
      {
        path: 'elearning',
        data: {
          title: 'Elearning',
        },
        component: ElearningComponent,
        children: [
          {
            path: '',
            component: ElearningMainComponent,
          },
          {
            path: 'unsubscribe',
            data: {
              title: 'Unsubscribe',
            },
            component: UnsubscribeComponent,
          },
        ],
      },
      {
        path: 'pictures',
        data: {
          title: 'Pictures',
        },
        component: PicturesComponent,
        children: [
          {
            path: '',
            component: PicturesMainComponent,
          },
          {
            path: 'dog',
            data: {
              title: 'Dog',
            },
            component: DogComponent,
          },
        ],
      },
    ],
    component: MainComponent,
  },
};

export default RoutesConfig;
