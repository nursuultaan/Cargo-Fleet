import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Widget1 from './Widget1';

test('should render', () => {
  render(<Widget1 widget={{ Active: 30, Total: 50 }} />);
  expect(screen.getByText(/Drivers/)).toBeInTheDocument();
  const selectRange = screen.getByRole('combobox');
  expect(selectRange.value).not.toBe('Active');
  expect(screen.getByText(/50/)).toBeInTheDocument();
  expect(selectRange.value).toBe('Total');
  fireEvent.change(selectRange, { target: { value: 'Active' } });
  expect(selectRange.value).toBe('Active');
});
