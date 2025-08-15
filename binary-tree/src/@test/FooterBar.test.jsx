import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterBar from '../components/footer-bar/FooterBar';
import { MemoryRouter } from 'react-router-dom';

describe('FooterBar', () => {
  it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <FooterBar />
        </MemoryRouter>
    );
    expect(screen.getByText(/binary tree app/i)).toBeInTheDocument();
  });
});
