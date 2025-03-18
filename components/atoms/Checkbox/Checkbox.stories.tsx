import type { Meta, StoryObj } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept Terms and Conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};
