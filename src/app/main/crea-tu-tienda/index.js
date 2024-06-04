// Redux
import { connect } from 'react-redux';
import { boWebPublicEditionActions as ActionsWebPublicEdition } from '@/app/redux/Backoffice/actions';

// Component
import CreaTuTienda from './CreaTuTienda';

const mapStateToProps = (state) => ({
  bannersCreaTienda: state.Backoffice_WebPublicEdition.BannersCreateStore
});

const mapDispatchToProps = (dispatch) => ({
  fetchBannerCreaTienda: (data) =>
    dispatch(ActionsWebPublicEdition.BannersCreaTienda.fetch(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreaTuTienda);
