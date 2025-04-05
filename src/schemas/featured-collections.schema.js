import headings from '../common/headings.schema';
import headingsAsideLayout from '../common/headings-aside-layout.schema';
import richtextContent from '../common/richtext-content.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Featured collections',
  class: 'shopify-section--featured-collections',
  disabled_on: {
    templates: ['password'],
    groups: ['header', 'footer', 'custom.overlay'],
  },
  max_blocks: 5,
  settings: [
    ...headings(),
    ...headingsAsideLayout(),
    ...richtextContent(),
    ...sectionLayout(),
    {
      type: 'range',
      id: 'products_count',
      label: 'Products to show',
      min: 4,
      max: 50,
      step: 1,
      default: 8,
    },
    {
      type: 'range',
      id: 'products_per_row',
      label: 'Products per row (desktop)',
      min: 2,
      max: 6,
      step: 1,
      default: 4,
    },
    {
      type: 'checkbox',
      id: 'stack_products',
      label: 'Stack products',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_cta',
      label: 'Show add to cart below info',
      info: 'If enabled, we recommend using 4 products per row at maximum.',
      default: false,
    },
    ...colors(),
  ],
  blocks: [
    {
      type: 'collection',
      name: 'Collection',
      settings: [
        {
          type: 'collection',
          id: 'collection',
          label: 'Collection',
        },
        {
          type: 'text',
          id: 'label',
          label: 'Tab label',
          info: 'Shown when more than 1 collection is featured. Collection title is used if none is set.',
        },
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
          type: 'select',
          id: 'link_style',
          label: 'Link style',
          options: [
            {
              value: 'link',
              label: 'Link',
            },
            {
              value: 'primary',
              label: 'Primary button',
            },
            {
              value: 'secondary',
              label: 'Secondary button',
            },
            {
              value: 'transparent',
              label: 'Transparent',
            },
          ],
          default: 'primary',
        },
        {
          type: 'url',
          id: 'button_url',
          label: 'Button link',
          info: 'If empty, the collection URL is used.',
        },
        {
          type: 'header',
          content: 'Colors',
        },
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
      ],
    },
  ],
  presets: [
    {
      name: 'Featured collections',
      blocks: [
        {
          type: 'collection',
        },
      ],
      settings: {},
    },
  ],
};
