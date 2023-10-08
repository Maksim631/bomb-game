import PropTypes from 'prop-types';
import { Team } from './components/Team';
import { NoTeamUsers } from './components/NoTeamUsers';

export const Teams = ({ teamOne, teamTwo, noTeamUsers }) => {
  return (
    <div>
      {teamOne && <Team name="Blue" team={teamOne} /> }
      {teamTwo && <Team name="Red" team={teamTwo} /> }
      {noTeamUsers.length > 0 && <NoTeamUsers users={noTeamUsers} /> }
    </div>
  )
}
Teams.propTypes = {
  teamOne: PropTypes.object.isRequired,
  teamTwo: PropTypes.object.isRequired,
  noTeamUsers: PropTypes.array.isRequired
};
