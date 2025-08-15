import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

// Basic smoke test to check if App renders without crashing

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
