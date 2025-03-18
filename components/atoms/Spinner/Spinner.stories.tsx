import type { Meta, StoryObj } from '@storybook/react';
import Spinner, { SpinnerProps } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/**
 * 1. Default Spinner: Variante border, color primary, tamaño mediano.
 */
export const Default: Story = {
  args: {
    variant: 'border',
    color: 'primary',
    size: 'md',
  },
};

/**
 * 2. Grow Spinner: Variante grow, color secondary, tamaño mediano.
 */
export const GrowSecondary: Story = {
  args: {
    variant: 'grow',
    color: 'secondary',
    size: 'md',
  },
};

/**
 * 3. Large Danger Spinner: Variante border, color danger, tamaño grande.
 */
export const LargeDanger: Story = {
  args: {
    variant: 'border',
    color: 'danger',
    size: 'lg',
  },
};

/**
 * 4. Small Warning Spinner: Variante grow, color warning, tamaño pequeño.
 */
export const SmallWarning: Story = {
  args: {
    variant: 'grow',
    color: 'warning',
    size: 'sm',
  },
};

/**
 * 5. Custom Info Spinner: Variante border, color info, tamaño grande.
 *    Se usa para mostrar una variante diferente con tamaño "lg".
 */
export const LargeInfo: Story = {
  args: {
    variant: 'border',
    color: 'info',
    size: 'lg',
  },
};
