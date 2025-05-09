// __tests__/components/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/app/components/Header';

describe('Header Component', () => {
  beforeEach(() => {
    // Mock localStorage
    const mockUser = { name: 'John Doe' };
    localStorage.setItem('user', JSON.stringify(mockUser));
  });

  it('handles logout correctly', () => {
    render(<Header />);
    
    // Find the user avatar button by its role and first letter
    const userButton = screen.getByRole('button', { name: /j/i });
    fireEvent.click(userButton);
    
    // Now find the logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});