import * as components from '../views';
import auth from './middleware/auth';

export default [
  {
    path: '/settings',
    redirect: { name: 'Characters' },
    name: 'Settings',
    component: components.Home,
    meta: {
      title: 'Settings',
      layout: 'app',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/characters',
    name: 'Characters',
    component: components.Settings.Characters,
    meta: {
      title: 'Settings',
      layout: 'app',
      middleware: [
        auth
      ]
    }
  }
];
