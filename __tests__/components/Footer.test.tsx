// __tests__/components/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from '@/app/components/Footer';

describe('Footer Component', () => {
  it('renders footer with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    // Use a more specific query to find the year
    expect(screen.getByText((content) => content.includes(currentYear.toString()))).toBeInTheDocument();
  });
});