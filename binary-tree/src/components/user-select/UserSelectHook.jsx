import { useState, useEffect } from 'react';
import { getAllUsers, createUser } from '../../services/UserService';
import DropdownSelect from '../dropdown-select/DropdownSelect';

const UserSelectHook = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection from dropdown
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    if (userId) {
      const user = users.find(u => u.id === parseInt(userId));
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  // Handle new user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    try {
      setLoading(true);
      const newUser = await createUser(newUserName.trim());
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setSelectedUserId(newUser.id.toString());
      setNewUserName('');
    } catch (err) {
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    selectedUserId,
    newUserName,
    currentUser,
    loading,
    error,
    handleUserSelect,
    handleCreateUser,
    setNewUserName,
    DropdownSelectComponent: DropdownSelect
  };
};

export default UserSelectHook;