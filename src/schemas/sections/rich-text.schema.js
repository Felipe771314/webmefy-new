module.exports = {
  name: 'Rich text',
  class: 'shopify-section--rich-text',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  settings: [
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
      default: 'Talk about your brand',
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
        '<p>Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store.</p>',
    },
    {
      type: 'select',
      id: 'truncate_content',
      label: 'Truncate content',
      options: [
        {
          value: 'none',
          label: "Don't truncate",
        },
        {
          value: 'all',
          label: 'Truncate on all devices',
        },
        {
          value: 'tablet_mobile',
          label: 'Truncate only on tablet & mobile',
        },
        {
          value: 'mobile',
          label: 'Truncate only on mobile',
        },
      ],
      default: 'none',
    },
    {
      type: 'number',
      id: 'content_max_length',
      label: 'Truncated content max length',
      default: 400,
    },
    {
      type: 'header',
      content: 'Button',
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
      default: 'transparent',
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
      id: 'text_width',
      label: 'Text width',
      options: [
        {
          value: 'small',
          label: 'Small',
        },
        {
          value: 'medium',
          label: 'Medium',
        },
        {
          value: 'large',
          label: 'Large',
        },
        {
          value: 'fill',
          label: 'Fill screen',
        },
      ],
      default: 'medium',
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
      ],
      default: 'center',
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
      type: 'header',
      content: 'Colors',
    },
    {
      type: 'color',
      id: 'background',
      label: 'Background',
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
  presets: [
    {
      name: 'Rich text',
      settings: {},
    },
  ],
};
