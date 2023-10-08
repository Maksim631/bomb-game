import PropTypes from 'prop-types';
import { UsersList } from './UsersList';

export const NoTeamUsers = ({ users }) => {
  return (
    <div>
      <h1>No team users</h1>
      <UsersList users={users} />
    </div>
  )
}

NoTeamUsers.propTypes = {
  users: PropTypes.array.isRequired
};
