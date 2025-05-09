// __tests__/pages/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders home page', () => {
    render(<Home />);
    expect(screen.getByText('Project Management Application')).toBeInTheDocument();
  });
});