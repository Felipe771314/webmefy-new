const deprecated = require('../common/deprecated.schema');

module.exports = {
  name: '/!\\Image with text overl.',
  class: 'shopify-section--image-with-text-overlay',
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
      type: 'select',
      id: 'section_height',
      label: 'Section height',
      options: [
        {
          value: 'auto',
          label: 'Original image ratio',
        },
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
      ],
      info: 'Choose "Original image ratio" to not cut images. [Learn more](https://help.shopify.com/en/manual/online-store/images/theme-images#best-practices-for-slideshows-and-full-width-images)',
      default: 'auto',
    },
    {
      type: 'image_picker',
      id: 'image',
      label: 'Image',
      info: '2000 x 980px .jpg recommended',
    },
    {
      type: 'header',
      content: 'Text',
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
      default: 'Image with text overlay',
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
      type: 'checkbox',
      id: 'text_shadow_toggle',
      label: 'Heading text shadow',
      default: false,
    },
    {
      type: 'color',
      id: 'text_shadow_color',
      label: 'Text shadow color',
      default: '#000000',
    },
    {
      type: 'range',
      id: 'text_shadow_color_opacity',
      label: 'Text shadow opacity',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      default: 100,
    },
    {
      type: 'richtext',
      id: 'content',
      label: 'Content',
      default:
        '<p>Use overlay text to give your customers insight into your brand. Select imagery and text that relates to your style and story.</p>',
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
      default: 'transparent',
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
          value: 'top_left',
          label: 'Top left',
        },
        {
          value: 'top_center',
          label: 'Top center',
        },
        {
          value: 'top_right',
          label: 'Top right',
        },
        {
          value: 'middle_left',
          label: 'Middle left',
        },
        {
          value: 'middle_center',
          label: 'Middle center',
        },
        {
          value: 'middle_right',
          label: 'Middle right',
        },
        {
          value: 'bottom_left',
          label: 'Bottom left',
        },
        {
          value: 'bottom_center',
          label: 'Bottom center',
        },
        {
          value: 'bottom_right',
          label: 'Bottom right',
        },
      ],
      default: 'middle_center',
    },
    {
      type: 'header',
      content: 'Colors',
    },
    {
      type: 'color',
      id: 'text_color',
      label: 'Text',
      default: '#ffffff',
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
    {
      type: 'color',
      id: 'overlay_color',
      label: 'Overlay',
      default: '#000000',
    },
    {
      type: 'range',
      id: 'overlay_opacity',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      label: 'Overlay opacity',
      default: 30,
    },
  ],
};
