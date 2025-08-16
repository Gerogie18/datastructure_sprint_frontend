import React, { useEffect } from 'react';
import UserSelectHook from './UserSelectHook.jsx';

const UserSelectionDiv = ({ onUserChange }) => {
  const userSelectProps = UserSelectHook();

  // Notify parent when current user changes
  useEffect(() => {
    if (onUserChange) {
      onUserChange(userSelectProps.currentUser);
    }
  }, [userSelectProps.currentUser, onUserChange]);

  return (
    <div className="user-select-container">
      <h3>Select or Create User</h3>
      
      {userSelectProps.error && <div className="error-message">{userSelectProps.error}</div>}
      
      {/* User Selection Dropdown */}
      <div className="user-selection">
        <label>Select Existing User:</label>
        <userSelectProps.DropdownSelectComponent
          options={userSelectProps.users}
          value={userSelectProps.selectedUserId}
          onChange={userSelectProps.handleUserSelect}
          placeholder="Choose a user..."
        />
      </div>

      {/* Create New User Form */}
      <div className="user-creation">
        <form onSubmit={userSelectProps.handleCreateUser}>
          <label>Or Create New User:</label>
          <input
            type="text"
            value={userSelectProps.newUserName}
            onChange={(e) => userSelectProps.setNewUserName(e.target.value)}
            placeholder="Enter your name"
            disabled={userSelectProps.loading}
          />
          <button type="submit" disabled={userSelectProps.loading || !userSelectProps.newUserName.trim()}>
            Create User
          </button>
        </form>
      </div>

      {/* Current User Display */}
      {userSelectProps.currentUser && (
        <div className="current-user">
          <p>Logged in as: <strong>{userSelectProps.currentUser.name}</strong></p>
        </div>
      )}
    </div>
  );
};

export default UserSelectionDiv;
