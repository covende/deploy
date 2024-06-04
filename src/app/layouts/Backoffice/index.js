// Redux
import { connect } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

import BackofficeLayout from './BackofficeLayout';

const mapStateToProps = (state) => ({
  auth: state.Auth.Backoffice
});

const mapDispatchToProps = (dispatch) => ({
  logout: (data) => dispatch(ActionsAuth.Backoffice.logout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BackofficeLayout);
