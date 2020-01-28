import * as components from '../views';
import guest from './middleware/guest';

export default [
  {
    path: '/',
    name: 'login',
    component: components.Login,
    meta: {
      title: "Login",
      layout: 'processor',
      visible: false,
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: components.Register,
    meta: {
      title: "Register",
      layout: 'processor',
      visible: false,
      middleware: [
        guest
      ]
    }
  }
];
