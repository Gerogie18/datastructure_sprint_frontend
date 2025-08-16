import { useEffect, useState } from 'react';
import { getAllTrees } from '../../services/TreeHistoryService';
import { getAllUsers } from '../../services/UserService';

/**
 * Custom hook for TreeHistory page: fetches trees and users, manages selection/modal state.
 */
export default function useTreeHistory() {
	const [trees, setTrees] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedTree, setSelectedTree] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showInput, setShowInput] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		Promise.all([getAllTrees(), getAllUsers()])
			.then(([treesData, usersData]) => {
				setTrees(treesData);
				setUsers(usersData);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message || 'Failed to load data');
				setLoading(false);
			});
	}, []);

	const getUserName = (userId) => {
		const user = users.find(u => u.id === userId);
		return user ? user.name : 'Unknown';
	};

	const handleRowClick = (tree) => {
		setSelectedTree(tree);
		const user = users.find(u => u.id === tree.userId);
		setSelectedUser(user || null);
		setShowInput(true);
		console.log('Selected Tree JSON:', tree.jsonTree);
	};

	const handleCloseInput = () => {
		setShowInput(false);
		setSelectedTree(null);
		setSelectedUser(null);
	};

	return {
		trees,
		users,
		selectedTree,
		selectedUser,
		showInput,
		loading,
		error,
		getUserName,
		handleRowClick,
		handleCloseInput,
	};
}
