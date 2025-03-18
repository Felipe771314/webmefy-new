import type { Meta, StoryObj } from '@storybook/react';
import Badge, { BadgeProps } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: 'New',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    text: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    text: 'Warning',
    variant: 'warning',
  },
};
