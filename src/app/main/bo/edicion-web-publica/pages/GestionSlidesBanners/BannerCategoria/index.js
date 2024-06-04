// Redux
import { connect } from 'react-redux';
import {
  boWebPublicEditionActions as ActionsWebPublicEdition,
  boCategoriesActions as ActionsCategories
} from '@/app/redux/Backoffice/actions';

// Component
import BannerCategoria from './BannerCategoria';

const mapStateToProps = (state) => {
  //console.log('bo.state', state);
  return {
    categories: state.Backoffice_Categories,
    bannersCategory: state.Backoffice_WebPublicEdition.BannersCategory
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(ActionsCategories.fetch()),
  fetchBannerCategory: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCategory.fetch(data)),
  addBannerCategory: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCategory.addItem(data)),
  editBannerCategory: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCategory.editItem(data)),
  deleteBannerCategory: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCategory.deleteItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerCategoria);
