// Redux
/*
import { connect } from 'react-redux';
import { boClientesActions as ActionsCustomers } from '@/app/redux/Backoffice/actions';
*/
// Component
import FacturasClientesBo from './FacturasClientesBo';
/*
const mapStateToProps = (state) => ({
  customers: state.Customers
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: () => dispatch(ActionsCustomers.fetch()),
  addCustomers: (data) => dispatch(ActionsCustomers.addItem(data)),
  editCustomers: (data) => dispatch(ActionsCustomers.editItem(data)),
  deleteCustomers: (data) => dispatch(ActionsCustomers.deleteItem(data))
});
*/
//export default connect(mapStateToProps, mapDispatchToProps)(FacturasClientesBo);
export default FacturasClientesBo;
