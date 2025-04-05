import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Logo list',
  class: 'shopify-section--logo-list',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  settings: [
    {
      type: 'checkbox',
      id: 'reveal_on_scroll',
      label: 'Reveal on scroll',
      info: 'Show animation when section becomes visible.',
      default: true,
    },
    ...headings(),
    {
      type: 'header',
      content: 'Button',
    },
    {
      type: 'text',
      id: 'button_text',
      label: 'Button text',
    },
    {
      type: 'url',
      id: 'button_link',
      label: 'Button link',
    },
    ...sectionLayout(),
    {
      type: 'checkbox',
      id: 'stack_logos',
      label: 'Stack logos',
      default: true,
      info: 'When stack, it is recommended to use a multiple of 6 logos.',
    },
    ...colors(),
    {
      type: 'color',
      id: 'button_background',
      label: 'Button background',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'button_text_color',
      label: 'Button text',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'logo_background',
      label: 'Logo background',
      default: 'rgba(0,0,0,0)',
    },
  ],
  blocks: [
    {
      name: 'Logo',
      type: 'logo',
      settings: [
        {
          type: 'image_picker',
          id: 'logo',
          label: 'Image',
          info: '450 x 150px .png recommended',
        },
        {
          type: 'url',
          id: 'link',
          label: 'Link',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'Logo list',
      blocks: [
        {
          type: 'logo',
        },
        {
          type: 'logo',
        },
        {
          type: 'logo',
        },
        {
          type: 'logo',
        },
        {
          type: 'logo',
        },
        {
          type: 'logo',
        },
      ],
    },
  ],
};
