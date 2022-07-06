import { lazy } from 'react';

const ProjectDashboardAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/dashboard',
      component: lazy(() => import('./ProjectDashboardApp'))
    }
  ]
};

export default ProjectDashboardAppConfig;
