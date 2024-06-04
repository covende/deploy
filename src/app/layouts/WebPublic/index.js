// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import WebPublicLayout from './WebPublicLayout';

const mapStateToProps = (state) => ({
  auth: state.Auth.BuyerSeller
});

const mapDispatchToProps = (dispatch) => ({
  logout: (data) => dispatch(ActionsAuth.BuyerSeller.logout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(WebPublicLayout);
