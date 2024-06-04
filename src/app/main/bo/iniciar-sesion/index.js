// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import IniciarSesionBo from './IniciarSesionBo';

const mapStateToProps = (state) => ({
  auth: state.Auth.Backoffice
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(ActionsAuth.Backoffice.login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesionBo);
