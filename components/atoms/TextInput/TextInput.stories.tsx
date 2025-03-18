import type { Meta, StoryObj } from '@storybook/react';
import TextInput, { TextInputProps } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter your name',
    value: 'John Doe',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
