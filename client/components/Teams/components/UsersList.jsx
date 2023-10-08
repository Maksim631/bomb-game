import PropTypes from 'prop-types';

export const UsersList = ({ users }) => {
  return (
      <ul>
        {users.map((user, index) => <li key={index}>{user}</li>)}
      </ul>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
