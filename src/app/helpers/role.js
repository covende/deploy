import * as User from '@/app/helpers/authUtils';

export const Role = {
  Buyer: 'Buyer',
  Seller: 'Seller',
  Admin: 'Admin',
  Administrador: 'Administrador',
  Moderador: 'Moderador'
};

const Platforms = ['PBS', 'PBO'];
const Dashboards = ['Vender', 'Comprar', 'Backoffice'];

export const isSomeUserRole = (currentUser, roles) => {
  return Platforms.includes(currentUser?.platformID || '');
  // currentUser = { ...currentUser, role: [currentUser.role] };
  // const isRole = (role) => Object.values(roles).indexOf(role) !== -1;
  // return currentUser.role.some(isRole);
};

export const rolemenu = () => {
  let user = User.getLoggedInUser();
  // let options = {
  //   Buyer: '/buyer',
  //   Seller: '/seller',
  //   Admin: '/bo/',
  //   Administrador: '/bo/'
  // };
  // return options[user?.role || 'Seller'];

  let options = {
    Comprar: '/buyer',
    Vender: '/seller',
    Backoffice: '/bo/'
  };

  let dashboards = user?.dashboards || [];
  let resp = '';

  if (dashboards?.length > 1) {
    console.log('Tiene 2 paneles');
    resp = options.Vender;
  } else {
    console.log('tiene un panel');
    resp = options[dashboards?.[0] || 'Vender'];
  }

  return resp;
};

export const typeuser = (rol) => {
  let options = {
    Buyer: 'Comprador',
    Seller: 'Vendedor',
    Admin: 'Covende'
  };
  return options[rol || 'Seller'];
};

export const rolesidebar = () => {
  if (window.location.pathname.indexOf('seller') > 0) return 'Vender'; //0
  if (window.location.pathname.indexOf('buyer') > 0) return 'Comprar'; //0
  if (window.location.pathname.indexOf('/bo/') > 0) return 'BO';
  return 'Vender'; //0
};

export const roleadmin = () => {
  let user = User.getLoggedInUser();
  let options = { Buyer: 1, Seller: 0, Admin: 2 };

  return options[user.role || 'Buyer'];
};

export const showPermissions = (listmenu, nameMenu, namePermission) => {
  const resultado = listmenu[0].headers.find(
    (found) => found.menuName === nameMenu
  );
  const permiso = resultado.permissions.find(
    (found) => found.name === namePermission
  );
  return permiso;
};

export const ROLESELLER = 'Seller';
export const ROLEBUYER = 'Buyer';
export const METHOD_PAYMENTDEF = '61a7043742aee843fcd94e7e';
export const ADMIN_ID = '60ec87d10d66622a506dceed';
export const ADMIN_USER_ID = '60ec87d10d66622a506dceee';
