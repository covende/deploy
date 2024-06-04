// Redux
import { connect } from 'react-redux';
import { boWebPublicEditionActions as ActionsWebPublicEdition } from '@/app/redux/Backoffice/actions';

// Component
import BannerLogin from './BannerLogin';

const mapStateToProps = (state) => ({
  bannersLogin: state.Backoffice_WebPublicEdition.BannersLogin
});

const mapDispatchToProps = (dispatch) => ({
  fetchBannerLogin: (data) =>
    dispatch(ActionsWebPublicEdition.BannersLogin.fetch(data)),
  addBannerLogin: (data) =>
    dispatch(ActionsWebPublicEdition.BannersLogin.addItem(data)),
  editBannerLogin: (data) =>
    dispatch(ActionsWebPublicEdition.BannersLogin.editItem(data)),
  deleteBannerLogin: (data) =>
    dispatch(ActionsWebPublicEdition.BannersLogin.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerLogin);
