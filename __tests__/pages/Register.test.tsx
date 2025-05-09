// __tests__/pages/Register.test.tsx
import { render, screen } from '@testing-library/react';
import Register from '@/app/auth/register/page';

describe('Register Page', () => {
  it('renders register form', () => {
    render(<Register />);
    // Use getByRole to find the heading
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });
});