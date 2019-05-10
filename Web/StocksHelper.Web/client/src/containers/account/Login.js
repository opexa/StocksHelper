import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accountActions from '../../actions/accountActions';

import Login from '../../components/account/Login';

const mapDispatchToProps = dispatch => bindActionCreators({
  login: accountActions.login
}, dispatch)

export default connect(
  state => state.account, 
  mapDispatchToProps
)(Login);