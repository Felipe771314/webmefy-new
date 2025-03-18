import type { Meta, StoryObj } from '@storybook/react';
import AlertMessage, { AlertMessageProps } from './AlertMessage';

const meta: Meta<typeof AlertMessage> = {
  title: 'Molecules/AlertMessage',
  component: AlertMessage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertMessage>;

export const Default: Story = {
  args: {
    message: 'Este es un mensaje de alerta.',
    variant: 'danger',
  },
};
