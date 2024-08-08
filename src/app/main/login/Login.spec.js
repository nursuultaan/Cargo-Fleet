import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('Company icon and name displays correctly', () => {
    const { getByTestId, getByRole } = render(<Login />);
  });
});
