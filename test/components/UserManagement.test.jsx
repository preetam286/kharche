import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserManagement from '../../src/components/UserManagement';

describe('UserManagement component', () => {
  it('shows confirm modal when removing user and calls onRemoveUser on confirm', async () => {
    const users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
    const expenses = [{ id: 10, payer: 1, involved: [1, 2] }];
    const onNewUserNameChange = vi.fn();
    const onAddUser = vi.fn((e) => e.preventDefault());
    const onRemoveUser = vi.fn();

    render(
      <UserManagement
        users={users}
        expenses={expenses}
        newUserName=""
        onNewUserNameChange={onNewUserNameChange}
        onAddUser={onAddUser}
        onRemoveUser={onRemoveUser}
      />
    );

    const removeButtons = screen.getAllByRole('button', { hidden: true });
    expect(removeButtons.length).toBeGreaterThan(0);

    fireEvent.click(removeButtons[0]);

    expect(screen.getByText(/Remove/)).toBeInTheDocument();

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(onRemoveUser).toHaveBeenCalled();
  });
});
