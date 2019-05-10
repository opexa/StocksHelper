import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accountActions from '../../actions/accountActions';
import Register from '../../components/account/Register';

const mapStateToProps = state => state.account;

const mapDispatchToProps = dispatch => bindActionCreators({
  register: accountActions.register
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);