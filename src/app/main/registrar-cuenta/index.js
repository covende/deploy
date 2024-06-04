// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import RegistrarCuenta from './RegistrarCuenta';

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth.BuyerSeller;
  return { user, loading, error };
};

const mapDispatchToProps = (dispatch) => ({
  register: (data, history) =>
    dispatch(ActionsAuth.BuyerSeller.register(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrarCuenta);
