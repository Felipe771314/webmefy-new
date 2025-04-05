import type { Meta, StoryObj } from '@storybook/react';
import Caroussel, { carousselCases } from './Caroussel';
import type { CarousselProps } from './Caroussel'; // 👈 Importar los props

const meta: Meta<typeof Caroussel> = {
  title: 'organisms/Caroussel',
  component: Caroussel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    items: { control: 'object' }, // FIX: 'array' no es válido en Storybook v7+
    autoPlay: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    loop: { control: 'boolean' },
    transitionType: {
      control: 'radio',
      options: ['slide', 'fade'],
    },
    itemStyle: { control: 'object' },
    containerStyle: { control: 'object' },
    arrowsPosition: {
      control: 'radio',
      options: ['inside', 'outside', 'bottom'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Caroussel>;

// ✅ Historia base con valores de ejemplo
export const Default: Story = {
  args: {
    title: 'Caroussel Demo',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),
    autoPlay: false,
    showArrows: true,
    loop: false,
    transitionType: 'slide',
    arrowsPosition: 'inside',
  },
};

// ✅ Historias extra con presets de casos, casteo seguro al tipo correcto
export const FlechasDentroDefault: Story = {
  args: carousselCases[0] as Partial<CarousselProps>,
};

export const FlechasAfuera: Story = {
  args: carousselCases[1] as Partial<CarousselProps>,
};

export const FlechasEnLaParteInferior: Story = {
  args: carousselCases[2] as Partial<CarousselProps>,
};

export const SinFlechas: Story = {
  args: carousselCases[3] as Partial<CarousselProps>,
};

export const AutoplayLoopBottomArrows: Story = {
  args: carousselCases[4] as Partial<CarousselProps>,
};

export const MuchosElementosConFlechasFuera: Story = {
  args: carousselCases[5] as Partial<CarousselProps>,
};

export const FlechasDentroAutoplay: Story = {
  args: carousselCases[6] as Partial<CarousselProps>,
};

export const LoopSinAutoplayConFlechasAfuera: Story = {
  args: carousselCases[7] as Partial<CarousselProps>,
};

export const TransicionFadeConFlechasEnBottom: Story = {
  args: carousselCases[8] as Partial<CarousselProps>,
};

export const SinAutoplayYsinLoop: Story = {
  args: carousselCases[9] as Partial<CarousselProps>,
};
