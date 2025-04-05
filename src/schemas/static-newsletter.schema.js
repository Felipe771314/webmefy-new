module.exports = {
  name: 'Newsletter',
  class: 'shopify-section--newsletter',
  settings: [
    {
      type: 'checkbox',
      id: 'show_section',
      label: 'Show section',
      default: false,
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
      type: 'richtext',
      id: 'content',
      label: 'Content',
      default: '<p>Promotions, new products and sales. Directly to your inbox.</p>',
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
};
