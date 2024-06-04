// Backoffice sagas
import categoriesSaga from '@/app/main/bo/arborescencia-de-categorias/redux/saga';
import usersSaga from '@/app/main/bo/usuarios/redux/saga';
import webPublicEditionSaga from '@/app/main/bo/edicion-web-publica/redux/saga';
import rolesSaga from '@/app/main/bo/roles/redux/saga';
import permissionsSaga from '@/app/main/bo/permisos/redux/saga';

export const boSagas = [
  categoriesSaga(),
  permissionsSaga(),
  rolesSaga(),
  usersSaga(),
  webPublicEditionSaga()
];
