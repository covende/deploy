import { allBackofficeRoutes } from '@/app/main/bo/boConfig';
import { allBuyerSellerRoutes } from '@/app/main/admin/adminConfig';
import { allWebPublicRoutes } from '@/app/main/wpConfig';

// Todas las rutas acopladas
const allRoutes = [
  ...allBackofficeRoutes,
  ...allBuyerSellerRoutes,
  ...allWebPublicRoutes
];

// Helper
const flattenRoutes = (routes = []) => {
  let flatRoutes = [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allFlattenRoutes };
