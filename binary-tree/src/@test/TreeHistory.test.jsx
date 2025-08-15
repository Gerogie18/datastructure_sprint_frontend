import React from 'react';
import { render } from '@testing-library/react';
import TreeHistory from '../pages/TreeHistory.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('TreeHistory', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <TreeHistory />
      </MemoryRouter>
    );
  });
});
