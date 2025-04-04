import type { Meta, StoryObj } from '@storybook/react';
import Caroussel, { carousselCases } from './Caroussel';

const meta: Meta<typeof Caroussel> = {
  title: 'organisms/Caroussel',
  component: Caroussel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    items: { control: 'array' },
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

// ✅ Exportación manual de cada story (seguro y sin errores)
export const FlechasDentroDefault: Story = {
  args: { ...carousselCases[0] },
};

export const FlechasAfuera: Story = {
  args: { ...carousselCases[1] },
};

export const FlechasEnLaParteInferior: Story = {
  args: { ...carousselCases[2] },
};

export const SinFlechas: Story = {
  args: { ...carousselCases[3] },
};

export const AutoplayLoopBottomArrows: Story = {
  args: { ...carousselCases[4] },
};

export const MuchosElementosConFlechasFuera: Story = {
  args: { ...carousselCases[5] },
};

export const FlechasDentroAutoplay: Story = {
  args: { ...carousselCases[6] },
};

export const LoopSinAutoplayConFlechasAfuera: Story = {
  args: { ...carousselCases[7] },
};

export const TransicionFadeConFlechasEnBottom: Story = {
  args: { ...carousselCases[8] },
};

export const SinAutoplayYsinLoop: Story = {
  args: { ...carousselCases[9] },
};
