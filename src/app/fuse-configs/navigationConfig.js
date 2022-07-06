import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'DASHBOARD',
        type: 'item',
        icon: 'dashboard',
        url: '/apps/dashboard'
      },
      // {
      //   id: 'calendar',
      //   title: 'Calendar',
      //   translate: 'CALENDAR',
      //   type: 'item',
      //   icon: 'today',
      //   url: '/apps/calendar'
      // },
      // {
      //   id: 'mail',
      //   title: 'Mail',
      //   translate: 'MAIL',
      //   type: 'item',
      //   icon: 'email',
      //   url: '/apps/mail',
      //   badge: {
      //     title: 25,
      //     bg: '#F44336',
      //     fg: '#FFFFFF'
      //   }
      // },
      {
        id: 'vehicles',
        title: 'Vehicles',
        translate: 'VEHICLES',
        type: 'item',
        icon: 'account_box',
        url: '/apps/vehicles/all'
      }
      // {
      //   id: 'chat',
      //   title: 'Chat',
      //   translate: 'CHAT',
      //   type: 'item',
      //   icon: 'chat',
      //   url: '/apps/chat',
      //   badge: {
      //     title: 13,
      //     bg: 'rgb(9, 210, 97)',
      //     fg: '#FFFFFF'
      //   }
      // }
    ]
  }
];

export default navigationConfig;
