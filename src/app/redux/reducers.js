import { combineReducers } from 'redux';
import Auth from './Auth/reducers';
import Platform from './Platform/reducer';
import Plans from './Plans/reducer';
import Niubiz from './Niubiz/reducers';
import Globales from './Global/Globales';
// Backoffice
import * as BO from './Backoffice/reducers';
import * as Admin from './Admin/reducers';
import * as WebPublic from './WebPublic/reducers';

export default combineReducers({
  Auth,
  Niubiz,
  Plans,
  Platform,
  Globales,
  ...BO,
  ...Admin,
  ...WebPublic
});
