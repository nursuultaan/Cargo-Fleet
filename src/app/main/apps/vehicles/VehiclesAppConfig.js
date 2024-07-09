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
    },
    {
      path: `/apps/vehicleInfo/:id`,
      component: lazy(() => import('./VehicleInfo'))
    }
  ]
};
export default VehiclesAppConfig;