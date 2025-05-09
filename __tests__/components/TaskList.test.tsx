// __tests__/components/TaskList.test.tsx
import { render, screen } from '@testing-library/react';
import TaskList from '@/app/components/TaskList';

describe('TaskList Component', () => {
  const mockTasks = [
    {
      id: 1,
      title: 'Test Task 1',
      description: 'Test Description 1',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Test Task 2',
      description: 'Test Description 2',
      status: 'done'
    }
  ];

  it('disables done and cancel buttons for non-pending tasks', () => {
    render(
      <TaskList 
        tasks={mockTasks} 
        onDone={() => {}}
        onCancel={() => {}}
        onDelete={() => {}}
      />
    );

    const doneButtons = screen.getAllByRole('button', { name: /done/i });
    const cancelButtons = screen.getAllByRole('button', { name: /cancel/i });

    // Check if the second button (for done task) is disabled
    expect(doneButtons[1]).toHaveAttribute('disabled');
    expect(cancelButtons[1]).toHaveAttribute('disabled');
  });
});