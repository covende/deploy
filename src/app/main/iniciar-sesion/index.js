// Redux
import { connect } from 'react-redux';
import { boWebPublicEditionActions as ActionsWebPublicEdition } from '@/app/redux/Backoffice/actions';

import IniciarSesion from './IniciarSesion';
// import ActionsAuth from '@/app/redux/Auth/actions';

const mapStateToProps = (state) => ({
  bannersLogin: state.Backoffice_WebPublicEdition.BannersLogin
});

const mapDispatchToProps = (dispatch) => ({
  fetchBannerLogin: (data) =>
    dispatch(ActionsWebPublicEdition.BannersLogin.fetch(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);
