// Redux
import { connect } from 'react-redux';
import {
  boPermissionsActions,
  boRolesActions,
  platformActions
} from '@/app/redux/actions';

// Component
import RolesBo from './RolesBo';
//console.log(state.Platform);
const mapStateToProps = (state) => ({
  platforms: state.Platform,
  permissions: state.Backoffice_Permissions,
  roles: state.Backoffice_Roles
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlatform: () => {
    dispatch(platformActions.fetch());
  },
  fetchRoles: (platformID) => {
    //dispatch(boPermissionsActions.fetch({ platformID: platformID }));
    dispatch(boRolesActions.fetch({ platformID: platformID }));
  },
  addRoles: (data) => dispatch(boRolesActions.addItem(data)),
  editRoles: (data) => dispatch(boRolesActions.editItem(data)),
  deleteRoles: (data) => dispatch(boRolesActions.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesBo);
