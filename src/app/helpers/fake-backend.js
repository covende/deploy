import { Role } from '.';

export function configureFakeBackend() {
  const users = [
    {
      id: 1,
      username: 'seller',
      password: 'seller',
      firstName: 'Seller',
      lastName: 'User',
      role: Role.Seller
    },
    {
      id: 2,
      username: 'buyer',
      password: 'buyer',
      firstName: 'Buyer',
      lastName: 'User',
      role: Role.Buyer
    }
  ];
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const authHeader = opts.headers.Authorization;
    const isLoggedIn =
      authHeader && authHeader.startsWith('Bearer fake-jwt-token');
    const roleString = isLoggedIn && authHeader.split('.')[1];
    const role = roleString ? Role[roleString] : null;

    return new Promise((resolve, reject) => {
      // Ajustar el tiempo de espera para simular la llamada a la API del servidor
      setTimeout(() => {
        // Autenticación - public
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const user = users.find(
            (x) =>
              x.username === params.username && x.password === params.password
          );
          if (!user) return error('Usuario o contraseña incorrecta');
          return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: `fake-jwt-token.${user.role}`
          });
        }

        // Obtener usuario por ID: administrador o usuario (el usuario solo puede acceder a su propio registro)
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
          if (!isLoggedIn) return unauthorised();

          // Obtener id de la URL de solicitud
          const urlParts = url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1]);

          // Permitir solo a los usuarios normales acceder a su propio registro
          const currentUser = users.find((x) => x.role === role);
          if (id !== currentUser.id && role !== Role.Admin) {
            return unauthorised();
          }

          const user = users.find((x) => x.id === id);
          return ok(user);
        }

        // Obtener todos los usuarios: solo administrador
        if (url.endsWith('/users') && opts.method === 'GET') {
          if (role !== Role.Admin) return unauthorised();
          return ok(users);
        }

        // Pasar por cualquier solicitud no manejada arriba
        realFetch(url, opts).then((response) => resolve(response));

        // Private helper functions

        function ok(body) {
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(body))
          });
        }

        function unauthorised() {
          resolve({
            status: 401,
            text: () =>
              Promise.resolve(JSON.stringify({ message: 'Unauthorised' }))
          });
        }

        function error(message) {
          resolve({
            status: 400,
            text: () => Promise.resolve(JSON.stringify({ message }))
          });
        }
      }, 500);
    });
  };
}
