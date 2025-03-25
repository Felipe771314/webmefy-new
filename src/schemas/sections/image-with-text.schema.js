const deprecated = require('../common/deprecated.schema');
module.exports = {
  name: '/!\\ Image with text',
  class: 'shopify-section--image-with-text',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  max_blocks: 2,
  settings: [
    ...deprecated('Promotion blocks'),
    {
      type: 'checkbox',
      id: 'reveal_on_scroll',
      label: 'Reveal on scroll',
      info: 'Show animation when section becomes visible.',
      default: true,
    },
    {
      type: 'select',
      id: 'background_type',
      label: 'Background',
      options: [
        {
          value: 'full_width',
          label: 'Full width',
        },
        {
          value: 'boxed',
          label: 'Boxed',
        },
      ],
      default: 'full_width',
    },
    {
      type: 'select',
      id: 'background_overlap',
      label: 'Background overlap',
      info: 'Add an accent background color below.',
      options: [
        {
          value: 'image',
          label: 'Image',
        },
        {
          value: 'text',
          label: 'Text',
        },
        {
          value: 'both',
          label: 'Both',
        },
      ],
      default: 'image',
    },
    {
      type: 'select',
      id: 'image_position',
      label: 'Desktop image position',
      options: [
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'right',
          label: 'Right',
        },
      ],
      default: 'left',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      type: 'select',
      id: 'block_space',
      label: 'Vertical block space',
      options: [
        {
          value: 'section--flush',
          label: 'None',
        },
        {
          value: 'section--tight',
          label: 'Small',
        },
        {
          value: 'section',
          label: 'Normal',
        },
      ],
      default: 'section',
    },
    {
      type: 'select',
      id: 'text_alignment',
      label: 'Text alignment',
      options: [
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'right',
          label: 'Right',
        },
      ],
      default: 'center',
    },
    {
      type: 'range',
      id: 'cycle_speed',
      min: 3,
      max: 20,
      step: 1,
      unit: 's',
      label: 'Change text every',
      default: 8,
    },
    {
      type: 'header',
      content: 'Colors',
    },
    {
      type: 'color',
      id: 'accent_background',
      label: 'Accent background',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'text_color',
      label: 'Text color',
      default: 'rgba(0,0,0,0)',
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
  blocks: [
    {
      type: 'item',
      name: 'Item',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
          info: '1400 x 1400px .jpg recommended',
        },
        {
          type: 'header',
          content: 'Text',
        },
        {
          type: 'text',
          id: 'tab_label',
          label: 'Tab label',
          info: 'Only shown if 2 text blocks are set',
          default: 'Item',
        },
        {
          type: 'text',
          id: 'subheading',
          label: 'Subheading',
          default: 'Subheading',
        },
        {
          type: 'select',
          id: 'subheading_tag',
          label: 'Subheading tag',
          options: [
            {
              value: 'h1',
              label: 'H1',
            },
            {
              value: 'h2',
              label: 'H2',
            },
            {
              value: 'h3',
              label: 'H3',
            },
            {
              value: 'h4',
              label: 'H4',
            },
            {
              value: 'h5',
              label: 'H5',
            },
            {
              value: 'h6',
              label: 'H6',
            },
            {
              value: 'span',
              label: 'SPAN',
            },
          ],
          default: 'h2',
        },
        {
          type: 'select',
          id: 'subheading_size',
          label: 'Subheading size',
          options: [
            {
              value: 'h1',
              label: 'H1',
            },
            {
              value: 'h2',
              label: 'H2',
            },
            {
              value: 'h3',
              label: 'H3',
            },
            {
              value: 'h4',
              label: 'H4',
            },
            {
              value: 'h5',
              label: 'H5',
            },
            {
              value: 'h6',
              label: 'H6',
            },
            {
              value: '',
              label: 'Default',
            },
          ],
          default: '',
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Image with text',
        },
        {
          type: 'select',
          id: 'heading_tag',
          label: 'Heading tag',
          options: [
            {
              value: 'h1',
              label: 'H1',
            },
            {
              value: 'h2',
              label: 'H2',
            },
            {
              value: 'h3',
              label: 'H3',
            },
            {
              value: 'h4',
              label: 'H4',
            },
            {
              value: 'h5',
              label: 'H5',
            },
            {
              value: 'h6',
              label: 'H6',
            },
            {
              value: 'span',
              label: 'SPAN',
            },
          ],
          default: 'h3',
        },
        {
          type: 'select',
          id: 'heading_size',
          label: 'Heading size',
          options: [
            {
              value: 'h1',
              label: 'H1',
            },
            {
              value: 'h2',
              label: 'H2',
            },
            {
              value: 'h3',
              label: 'H3',
            },
            {
              value: 'h4',
              label: 'H4',
            },
            {
              value: 'h5',
              label: 'H5',
            },
            {
              value: 'h6',
              label: 'H6',
            },
            {
              value: 'span',
              label: 'SPAN',
            },
          ],
          default: 'h2',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default:
            '<p>Use image with text to give your customers insight into your brand. Select imagery and text that relates to your style and story.</p>',
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
};
