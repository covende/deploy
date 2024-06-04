// Redux
/*
import { connect } from 'react-redux';
import { boCategoriesActions as ActionsCategories } from '@/app/redux/Backoffice/actions';
*/
// Component
import ArborescenciaCategoriasBo from './ArborescenciaCategoriasBo';
/*
const mapStateToProps = (state) => ({
  categories: state.Backoffice_Categories
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(ActionsCategories.fetch()),
  addCategories: (data) => dispatch(ActionsCategories.addItem(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArborescenciaCategoriasBo);*/

export default ArborescenciaCategoriasBo;
