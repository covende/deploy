import { UPDATE_READ, UPDATE_SALA, UPDATE_SATATUS_SALA } from './salaActions';

const initialState = {
  auth: {
    id: '',
    type: ''
  },
  case: '',
  createdAt: '',
  created_by: {
    id: '',
    type: ''
  },
  custom_id: '',
  origin: '',
  read: false,
  sala: '',
  status: '',
  to_user: {
    id: '',
    type: ''
  },
  type: '',
  updatedAt: '',
  user_last: {
    id: '',
    name: '',
    photo: '',
    type: ''
  },
  participants: []
};

function sala(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SALA:
      return action.payload;
    case UPDATE_READ:
      return {
        ...state,
        read: action.payload
      };
    case UPDATE_SATATUS_SALA:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}

export default sala;
