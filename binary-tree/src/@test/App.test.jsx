import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

// Basic smoke test to check if App renders without crashing

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(true).toBe(true); // If render fails, this test will error
  });
});
