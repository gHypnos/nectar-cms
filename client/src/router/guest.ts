import * as components from '../views';
import guest from './middleware/guest';

export default [
  {
    path: '/',
    name: 'Login',
    component: components.Processor,
    meta: {
      title: "Login",
      layout: 'processor',
      visible: false,
      middleware: [
        guest
      ]
    }
  }
];
