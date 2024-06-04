import { Route } from 'react-router-dom';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const LinkedinConfig = [
  {
    path: '/linkedin',
    name: 'Linkedin',
    component: LinkedInCallback,
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
