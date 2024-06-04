import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Can = (props) => {
  const couldShow = props.userPermissions.includes(props.permission);
  return couldShow ? props.children : null;
};

Can.propTypes = {
  permission: PropTypes.string.isRequired,
  userPermissions: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  //console.log('state', state);
  return {
    userPermissions: state.Auth
  };
};

export default connect(mapStateToProps)(Can);
