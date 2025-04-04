import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalDialog from '../ModalDialog';

describe('ModalDialog', () => {
  test('opens modal after clicking the open button', () => {
    render(<ModalDialog title="Test Modal" content="Modal content" />);

    fireEvent.click(screen.getByText('Abrir Modal'));

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('closes modal after clicking close button', () => {
    render(<ModalDialog title="Test Modal" content="Modal content" />);

    fireEvent.click(screen.getByText('Abrir Modal'));

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('calls onPrimaryAction and closes modal when clicking primary button', () => {
    const onPrimaryAction = jest.fn();

    render(
      <ModalDialog
        title="Confirm"
        content="Are you sure?"
        primaryActionLabel="Yes"
        onPrimaryAction={onPrimaryAction}
      />,
    );

    fireEvent.click(screen.getByText('Abrir Modal'));

    fireEvent.click(screen.getByText('Yes'));

    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
  });

  test('calls onSecondaryAction and closes modal when clicking secondary button', () => {
    const onSecondaryAction = jest.fn();

    render(
      <ModalDialog
        title="Cancel?"
        content="Do you want to cancel?"
        secondaryActionLabel="No"
        onSecondaryAction={onSecondaryAction}
      />,
    );

    fireEvent.click(screen.getByText('Abrir Modal'));

    fireEvent.click(screen.getByText('No'));

    expect(onSecondaryAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Cancel?')).not.toBeInTheDocument();
  });
});
