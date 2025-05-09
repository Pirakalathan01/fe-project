// __tests__/components/TaskForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '@/app/components/TaskForm';

describe('TaskForm Component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with all elements', () => {
    render(<TaskForm onAdd={mockOnAdd} />);
    
    expect(screen.getByText('Add a Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('calls onAdd with form data when submitted', () => {
    render(<TaskForm onAdd={mockOnAdd} />);
    
    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const submitButton = screen.getByText('Add');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith('Test Task', 'Test Description');
  });

  it('clears form after submission', () => {
    render(<TaskForm onAdd={mockOnAdd} />);
    
    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const submitButton = screen.getByText('Add');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });
});