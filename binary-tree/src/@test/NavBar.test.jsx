import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/nav-bar/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/tree history/i)).toBeInTheDocument();
  });
});
