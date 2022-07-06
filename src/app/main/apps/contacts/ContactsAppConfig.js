import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/vehicles/:id',
      component: lazy(() => import('./ContactsApp'))
    },
    {
      path: '/apps/vehicles',
      component: () => <Redirect to="/apps/vehicles/all" />
    }
  ]
};

export default ContactsAppConfig;
