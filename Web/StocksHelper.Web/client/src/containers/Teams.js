import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import teamsActions from '../actions/teamsActions';
import alertsActions from '../actions/alertsActions';
import Teams from '../components/teams/Teams';

const mapStateToProps = state => state.teams;

const mapDispatchToProps = dispatch => bindActionCreators({
  ...teamsActions,
  ...alertsActions
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);