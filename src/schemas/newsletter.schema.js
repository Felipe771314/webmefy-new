module.exports = {
  name: 'Newsletter',
  class: 'shopify-section--newsletter',
  disabled_on: {
    groups: ['header', 'custom.overlay'],
  },
  settings: [
    {
      type: 'paragraph',
      content:
        'Customers who subscribe will have their email address added to the "accepts marketing" [customer list](/admin/customers?query=&accepts_marketing=1).',
    },
    {
      type: 'checkbox',
      id: 'reveal_on_scroll',
      label: 'Reveal on scroll',
      info: 'Show animation when section becomes visible.',
      default: true,
    },
    {
      type: 'image_picker',
      id: 'image',
      label: 'Image',
      info: '2000 x 980px .jpg recommended',
    },
    {
      type: 'text',
      id: 'subheading',
      label: 'Subheading',
      default: 'Subscribe to our newsletter',
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
      type: 'richtext',
      id: 'content',
      label: 'Content',
      default: '<p>Promotions, new products and sales. Directly to your inbox.</p>',
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
      id: 'text_position',
      label: 'Desktop text position',
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
      default: 'right',
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
      default: 'left',
    },
    {
      type: 'header',
      content: 'Colors',
    },
    {
      type: 'color',
      id: 'text_background',
      label: 'Text background',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'checkbox',
      id: 'use_transparent_text_background',
      label: 'Use transparent text background',
      default: false,
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
  presets: [
    {
      name: 'Newsletter',
      settings: {},
    },
  ],
};
