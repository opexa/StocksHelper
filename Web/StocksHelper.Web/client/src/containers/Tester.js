import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import testerActions from '../actions/testerActions';
import Tester from '../components/Tester';


const mapDispatchToProps = dispatch => bindActionCreators({
  getTestData: testerActions.getTestData
}, dispatch)

export default connect(
  state => state.tester,
  mapDispatchToProps
)(Tester);