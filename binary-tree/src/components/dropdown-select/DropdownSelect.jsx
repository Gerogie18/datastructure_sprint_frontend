import React from 'react';
import './DropdownSelect.css';

const DropdownSelect = ({ options, value, onChange, placeholder = "Select an option..." }) => {
  return (
    <select 
      className="dropdown-select" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;