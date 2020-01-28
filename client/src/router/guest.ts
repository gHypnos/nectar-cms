import * as components from '../views';
import guest from './middleware/guest';

export default [
  {
    path: '/',
    name: 'Login',
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
    name: 'Legister',
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
