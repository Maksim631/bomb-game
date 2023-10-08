import PropTypes from 'prop-types';
import { UsersList } from './UsersList';

export const Team = ({name, team: { users, score} }) => {
  return (
    <div>
      <h1>Team {name}</h1>
      <UsersList  users={users} />
      <h2>Score: {score}</h2>
    </div>
  )
}

Team.propTypes = {
  name: PropTypes.string.isRequired,
  team: PropTypes.object.isRequired,
};
