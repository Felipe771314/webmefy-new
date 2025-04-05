import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Timeline',
  class: 'shopify-section--timeline',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  max_blocks: 5,
  settings: [
    ...headings(),
    ...sectionLayout(),
    {
      type: 'select',
      id: 'text_position',
      label: 'Desktop item text position',
      options: [
        {
          value: 'top',
          label: 'Top',
        },
        {
          value: 'middle',
          label: 'Middle',
        },
        {
          value: 'bottom',
          label: 'Bottom',
        },
      ],
      default: 'middle',
    },
    ...colors(),
    {
      type: 'color',
      id: 'item_background',
      label: 'Box background',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'item_text_color',
      label: 'Box text',
      default: 'rgba(0,0,0,0)',
    },
  ],
  blocks: [
    {
      type: 'item',
      name: 'Item',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
          info: '1000 x 1000px .jpg recommended',
        },
        {
          type: 'text',
          id: 'label',
          label: 'Progress bar label',
          default: 'Date',
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Your heading',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default: '<p>Write content about your store</p>',
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
      ],
    },
  ],
  presets: [
    {
      name: 'Timeline',
      blocks: [
        {
          type: 'item',
          settings: {
            label: '2000',
          },
        },
        {
          type: 'item',
          settings: {
            label: '2010',
          },
        },
        {
          type: 'item',
          settings: {
            label: '2020',
          },
        },
      ],
      settings: {},
    },
  ],
};
