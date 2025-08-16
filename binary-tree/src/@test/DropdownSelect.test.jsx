import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownSelect from '../components/dropdown-select/DropdownSelect';

describe('DropdownSelect', () => {
  it('renders without crashing', () => {
    const mockOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
    
    render(
      <DropdownSelect 
        options={mockOptions} 
        value="" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByDisplayValue('Select an option...')).toBeInTheDocument();
  });
});