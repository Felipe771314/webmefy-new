import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
} as Meta;

export const Default: StoryObj<typeof Button> = {
  args: {},
};
