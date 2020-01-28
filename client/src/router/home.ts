import * as components from '../views';
import auth from './middleware/auth';

export default [
  {
    path: '/home',
    name: 'Home',
    component: components.Home,
    meta: {
      title: 'Home',
      layout: 'app',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: components.Client,
    meta: {
      title: 'Hotel',
      layout: 'app',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: components.Logout,
    meta: {
      title: "Logout",
      layout: 'processor',
      middleware: [
        auth
      ]
    }
  }
];
