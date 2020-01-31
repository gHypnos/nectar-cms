import * as components from '../views';
import auth from './middleware/auth';

export default [
  {
    path: '/community',
    redirect: { name: 'Photos' },
    name: 'Community',
    component: components.Community.Photos,
    meta: {
      title: 'Settings',
      layout: 'app',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/community/photos',
    name: 'Photos',
    component: components.Community.Photos,
    meta: {
      title: 'Settings',
      layout: 'app',
      middleware: [
        auth
      ]
    }
  }
];
