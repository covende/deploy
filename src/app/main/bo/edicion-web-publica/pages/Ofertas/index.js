// Redux
import { connect } from 'react-redux';
import {
  boWebPublicEditionActions as ActionsWebPublicEdition,
  boCategoriesActions as ActionsCategories
} from '@/app/redux/Backoffice/actions';

// Component
import Ofertas from './Ofertas';

const mapStateToProps = (state) =>
  // console.log('state', state);
  ({
    categories: state.Backoffice_Categories,
    bannersOffers: state.Backoffice_WebPublicEdition.BannersOffer
  });
const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(ActionsCategories.fetch()),
  fetchBannerOffers: (data) =>
    dispatch(ActionsWebPublicEdition.BannersOffers.fetch(data)),
  addBannerOffers: (data) =>
    dispatch(ActionsWebPublicEdition.BannersOffers.addItem(data)),
  editBannerOffers: (data) =>
    dispatch(ActionsWebPublicEdition.BannersOffers.editItem(data)),
  deleteBannerOffers: (data) =>
    dispatch(ActionsWebPublicEdition.BannersOffers.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Ofertas);
