import type { Meta, StoryObj } from '@storybook/react';
import ModalDialog, { ModalDialogProps } from './ModalDialog';

const meta: Meta<typeof ModalDialog> = {
  title: 'Molecules/ModalDialog',
  component: ModalDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalDialog>;

export const Default: Story = {
  args: {
    title: 'Título del Modal',
    content: 'Este es el contenido del modal.',
  },
};
