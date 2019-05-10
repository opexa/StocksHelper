import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import layoutActions from '../actions/layoutActions';
import Layout from '../components/shared/Layout';

const mapStateToProps = state => state.layout;

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle: layoutActions.toggleNavbar,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);