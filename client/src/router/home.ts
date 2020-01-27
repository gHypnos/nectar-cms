import * as components from '../views';
import auth from './middleware/auth';

export default [
  {
    path: '/home',
    name: 'Home',
    component: components.Home,
    meta: {
      layout: 'app',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: components.Logout,
    meta: {
      layout: 'processor',
      middleware: [
        auth
      ]
    }
  }
];
