import type { Meta, StoryObj } from '@storybook/react';
import FormInputGroup, { FormInputGroupProps } from './FormInputGroup';

const meta: Meta<typeof FormInputGroup> = {
  title: 'Molecules/FormInputGroup',
  component: FormInputGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInputGroup>;

export const Default: Story = {
  args: {
    id: 'name-input',
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    helpText: 'Este es tu nombre completo.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'email-input',
    label: 'Correo electrónico',
    placeholder: 'ejemplo@dominio.com',
    disabled: true,
    helpText: 'El correo no puede ser modificado.',
  },
};
