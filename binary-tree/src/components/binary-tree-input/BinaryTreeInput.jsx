import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BinaryTreeInput.css';

const BinaryTreeInput = ({ currentUser, onSubmit }) => {
  const [numbers, setNumbers] = useState(['']);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Add a new empty input box
  const addNumberInput = () => {
    setNumbers([...numbers, '']);
  };

  // Update a specific input value
  const updateNumber = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
    
    // Auto-add new input if this is the last one and it's not empty
    if (index === numbers.length - 1 && value.trim() !== '') {
      addNumberInput();
    }
  };

  // Remove an input box
  const removeNumber = (index) => {
    if (numbers.length > 1) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentUser) {
      setError('Please select or create a user first');
      return;
    }

    // Filter out empty values and convert to integers
    const validNumbers = numbers
      .filter(num => num.trim() !== '')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));

    if (validNumbers.length === 0) {
      setError('Please enter at least one valid number');
      return;
    }

    if (onSubmit) {
      onSubmit({ userId: currentUser.id, numbers: validNumbers });
      setSuccess('Tree submitted successfully!');
      setNumbers(['']);
    }
  };

  // Handle Enter key press to submit form
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="binary-tree-input-container">
      <h3>Create Binary Search Tree</h3>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="numbers-input-section">
          <label>Enter Numbers (one per box):</label>
          <div className="number-inputs">
            {numbers.map((number, index) => (
              <div key={index} className="number-input-row">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => updateNumber(index, e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Number ${index + 1}`}
                />
                {numbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeNumber(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addNumberInput}
            className="add-number-btn"
          >
            + Add Another Number
          </button>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={!currentUser}
            className="create-tree-btn"
          >
            Create Binary Tree
          </button>
          {!currentUser && (
            <p className="user-warning">Please select or create a user to continue</p>
          )}
        </div>
        
        <p className="keyboard-hint">
          Tip: Press Ctrl + Enter to submit
        </p>
      </form>
    </div>
  );
};

BinaryTreeInput.propTypes = {
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default BinaryTreeInput;
