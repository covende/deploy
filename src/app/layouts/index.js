import { lazy } from 'react';

// Layouts
const CleanOut = lazy(() => import('@/app/layouts/CleanOut'));
const WebPublic = lazy(() => import('@/app/layouts/WebPublic'));
const BuyerSeller = lazy(() => import('@/app/layouts/BuyerSeller'));
const Backoffice = lazy(() => import('@/app/layouts/Backoffice'));
const AuthBuyerSeller = lazy(() => import('@/app/layouts/AuthBuyerSeller'));
const AuthBackoffice = lazy(() => import('@/app/layouts/AuthBackoffice'));

export default {
  CleanOut,
  WebPublic,
  BuyerSeller,
  Backoffice,
  AuthBuyerSeller,
  AuthBackoffice
};
