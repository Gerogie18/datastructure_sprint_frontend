import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages/Home.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
  it('renders without crashing', () => {
    render( 
    <MemoryRouter>
        <Home />
    </MemoryRouter>);
    expect(true).toBe(true); // If render fails, this test will error
  });
});
