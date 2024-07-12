import { lazy } from 'react';

const DriverAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/drivers/all',
      component: lazy(() => import('./DriverApp'))
    }
  ]
};

export default DriverAppConfig;
