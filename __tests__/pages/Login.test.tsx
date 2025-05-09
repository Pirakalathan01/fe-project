// __tests__/pages/Login.test.tsx
import { render, screen } from '@testing-library/react';
import Login from '@/app/auth/login/page';

describe('Login Page', () => {
  it('renders login form', () => {
    render(<Login />);
    // Use getByRole to find the heading
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});