const deprecated = require('../common/deprecated.schema');
module.exports = {
  name: '/!\\ Image with text block',
  class: 'shopify-section--image-with-text-block',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
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
      type: 'header',
      content: 'Image',
    },
    {
      type: 'image_picker',
      id: 'image',
      label: 'Image',
      info: '2800 x 1400px .jpg recommended. Image may be cut based on screen size.',
    },
    {
      type: 'image_picker',
      id: 'mobile_image',
      label: 'Mobile image',
      info: '1800 x 1800px .jpg recommended. If none is set, desktop image will be used.',
    },
    {
      type: 'select',
      id: 'image_position',
      label: 'Image vertical alignment',
      options: [
        {
          value: 'top',
          label: 'Top',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'bottom',
          label: 'Bottom',
        },
      ],
      default: 'center',
    },
    {
      type: 'header',
      content: 'Texte',
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
      default: 'Image with text block',
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
      default: 'h3',
    },
    {
      type: 'richtext',
      id: 'content',
      label: 'Content',
      default:
        '<p>Use block text to give your customers insight into your brand. Select impactful text that relates to your brand and story.</p>',
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
      type: 'url',
      id: 'button_link',
      label: 'Button link',
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
      type: 'select',
      id: 'button_size',
      label: 'Button size',
      options: [
        {
          value: 'small',
          label: 'Small',
        },
        {
          value: 'normal',
          label: 'Normal',
        },
        {
          value: 'full',
          label: 'Full',
        },
      ],
      default: 'normal',
    },
    {
      type: 'header',
      content: 'Layout',
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
      id: 'text_position',
      label: 'Text position',
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
        {
          value: 'overlap_left',
          label: 'Overlap left',
        },
        {
          value: 'overlap_right',
          label: 'Overlap right',
        },
      ],
      default: 'left',
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
      label: 'Button',
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
      id: 'section_bg',
      label: 'Section background',
      default: 'rgba(0,0,0,0)',
    },
  ],
};
