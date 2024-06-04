// Redux
/*
import { connect } from 'react-redux';
import { boClientesActions as ActionsCustomers } from '@/app/redux/Backoffice/actions';
*/
// Component
import ClientesBo from './ClientesBo';
/*
const mapStateToProps = (state) => ({
  customers: state.Customers
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: () => dispatch(ActionsCustomers.fetch()),
  selectCustomer: (item) => dispatch(ActionsCustomers.selectItem(item)),
  addCustomers: (item) => dispatch(ActionsCustomers.addItem(item)),
  editCustomers: (item) => dispatch(ActionsCustomers.editItem(item)),
  deleteCustomers: (item) => dispatch(ActionsCustomers.deleteItem(item))
});*/

//export default connect(mapStateToProps, mapDispatchToProps)(ClientesBo);
export default ClientesBo;
