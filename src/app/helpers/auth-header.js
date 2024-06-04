import { authenticationService } from '.';

// Encabezado de autorización de devolución con token jwt
export function authHeader() {
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
}
