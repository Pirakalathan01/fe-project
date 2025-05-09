// __tests__/components/ConfirmModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '@/app/components/ConfirmModal';

describe('ConfirmModal Component', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when not open', () => {
    render(
      <ConfirmModal
        open={false}
        title="Test Title"
        message="Test Message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('renders modal content when open', () => {
    render(
      <ConfirmModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('handles confirm and cancel actions', () => {
    render(
      <ConfirmModal
        open={true}
        title="Test Title"
        message="Test Message"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText('Yes'));
    expect(mockOnConfirm).toHaveBeenCalled();

    fireEvent.click(screen.getByText('No'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});