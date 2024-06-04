// Redux
import { connect } from 'react-redux';
import { boWebPublicEditionActions as ActionsWebPublicEdition } from '@/app/redux/Backoffice/actions';

// Component
import BannerHome from './BannerHome';

const mapStateToProps = (state) => ({
  bannersHome: state.Backoffice_WebPublicEdition.BannersHome
});

const mapDispatchToProps = (dispatch) => ({
  fetchBannerHome: () => dispatch(ActionsWebPublicEdition.BannersHome.fetch()),
  addBannerHome: (data) =>
    dispatch(ActionsWebPublicEdition.BannersHome.addItem(data)),
  editBannerHome: (data) =>
    dispatch(ActionsWebPublicEdition.BannersHome.editItem(data)),
  deleteBannerHome: (data) =>
    dispatch(ActionsWebPublicEdition.BannersHome.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerHome);
