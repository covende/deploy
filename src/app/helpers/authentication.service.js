import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '.';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch('/users/authenticate', requestOptions)
    .then(handleResponse)
    .then((user) => {
      // Almacenar los detalles del usuario y el token jwt en el almacenamiento local
      // para mantener al usuario conectado entre actualizaciones de la página
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

// Eliminar al usuario del almacenamiento local para cerrar su sesión
function logout() {
  console.log('Funci+on llamando');
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
