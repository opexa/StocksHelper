import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import teamsActions from '../actions/teamsActions';
import Teams from '../components/teams/Teams';

const mapStateToProps = state => state.teams;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMyTeams: teamsActions.fetchMyTeams,
  loadTeam: teamsActions.loadTeam
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);