import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalDialog from '../ModalDialog';

describe('ModalDialog', () => {
  test('opens and closes modal', () => {
    render(<ModalDialog title="Test Modal" content="Modal content" />);
    fireEvent.click(screen.getByText('Abrir Modal'));
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });
});
