import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const VehiclesAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/vehicles/:id',
      component: lazy(() => import('./VehiclesApp'))
    },
    {
      path: '/apps/vehicles',
      component: () => <Redirect to="/apps/vehicles/all" />
    }
  ]
};

export default VehiclesAppConfig;
