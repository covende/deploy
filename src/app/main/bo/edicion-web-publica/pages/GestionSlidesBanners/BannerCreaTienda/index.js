// Redux
import { connect } from 'react-redux';
import { boWebPublicEditionActions as ActionsWebPublicEdition } from '@/app/redux/Backoffice/actions';

// Component
import BannerCreaTienda from './BannerCreaTienda';

const mapStateToProps = (state) => ({
  bannersCreaTienda: state.Backoffice_WebPublicEdition.BannersCreateStore
});

const mapDispatchToProps = (dispatch) => ({
  fetchBannerCreaTienda: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCreaTienda.fetch(data)),
  addBannerCreaTienda: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCreaTienda.addItem(data)),
  editBannerCreaTienda: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCreaTienda.editItem(data)),
  deleteBannerCreaTienda: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCreaTienda.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerCreaTienda);
