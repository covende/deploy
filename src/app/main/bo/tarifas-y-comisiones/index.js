// Redux
/*
import { connect } from 'react-redux';
import { plansActions, boRolesActions } from '@/app/redux/actions';
*/
// Component
import TarifasComisionesBo from './TarifasComisionesBo';
/*
const mapStateToProps = (state) => ({
  plans: state.Plans,
  roles: state.Backoffice_Roles
});

const mapDispatchToProps = (dispatch) => ({
  fetchRoles: () => {
    dispatch(boRolesActions.fetch({ platformID: 'PBS' }));
  },
  fetchPlans: (roleId) => {
    dispatch(plansActions.fetchByRole({ role: roleId }));
  },
  addPlans: (data) => dispatch(plansActions.addItem(data)),
  editPlans: (data) => dispatch(plansActions.editItem(data)),
  deletePlans: (data) => dispatch(plansActions.deleteItem(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TarifasComisionesBo);
*/
export default TarifasComisionesBo;
