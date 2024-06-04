// Redux
import { connect } from 'react-redux';
import {
  boRolesActions,
  boUsersActions,
  platformActions
} from '@/app/redux/actions';

// Component
import UsuariosBo from './UsuariosBo';

const mapStateToProps = (state) => ({
  platforms: state.Platform,
  users: state.Users,
  roles: state.Backoffice_Roles
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlatform: () => {
    dispatch(platformActions.fetch());
  },
  fetchUsers: (platformID) => {
    dispatch(boRolesActions.fetch({ platformID: 'PBO' }));
    dispatch(boUsersActions.fetch({ platformID: platformID }));
  },
  addUsers: (data) => dispatch(boUsersActions.addItem(data)),
  editUsers: (data) => dispatch(boUsersActions.editItem(data)),
  deleteUsers: (data) => dispatch(boUsersActions.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosBo);
