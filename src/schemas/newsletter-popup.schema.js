module.exports = {
  name: 'Newsletter popup',
  class: 'shopify-section--popup',
  enabled_on: {
    groups: ['custom.overlay'],
  },
  limit: 1,
  settings: [
    {
      type: 'checkbox',
      id: 'toggle_form',
      label: 'Show form',
      default: true,
    },
    {
      type: 'paragraph',
      content:
        'Customers who subscribe will have their email address added to the "accepts marketing" [customer list](/admin/customers?query=&accepts_marketing=1).',
    },
    {
      type: 'range',
      id: 'apparition_delay',
      min: 0,
      max: 15,
      step: 1,
      unit: 'sec',
      label: 'Delay until the popup appears',
      default: 5,
    },
    {
      type: 'range',
      id: 'viewed_pages',
      min: 0,
      max: 15,
      step: 1,
      label: 'Number of pages viewed until the popup appears',
      default: 0,
    },
    {
      type: 'checkbox',
      id: 'show_only_on_index',
      label: 'Show only on home page',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_only_for_visitors',
      label: 'Disable for account holders',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_only_once',
      label: 'Show once to visitors',
      default: true,
    },
    {
      type: 'image_picker',
      id: 'image',
      label: 'Image',
      info: '1000 x 1000px .jpg recommended',
    },
    {
      type: 'image_picker',
      id: 'mobile_image',
      label: 'Mobile image',
      info: '1800 x 900px .jpg recommended. If none is set, desktop image will be used.',
    },
    {
      type: 'checkbox',
      id: 'hide_image_on_mobile',
      label: 'Hide image on mobile',
      default: false,
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      type: 'select',
      id: 'image_position',
      label: 'Image position',
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
      type: 'select',
      id: 'image_alignement',
      label: 'Image alignment',
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
      type: 'select',
      id: 'block_position',
      label: 'Block position',
      info: 'Desktop newsletter block position',
      options: [
        {
          value: 'bottom_left',
          label: 'Bottom left',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'bottom_right',
          label: 'Bottom right',
        },
      ],
      default: 'center',
    },
    {
      type: 'header',
      content: 'Text',
    },
    {
      type: 'text',
      id: 'title',
      label: 'Heading',
      default: 'Get 10% off',
    },
    {
      type: 'richtext',
      id: 'content',
      label: 'Text',
      default: '<p>Promotions, new products and sales. Directly to your inbox.</p>',
    },
    {
      type: 'richtext',
      id: 'terms_text',
      label: 'Terms text',
      info: 'If empty, global settings will be used',
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
      content: 'Button',
    },
    {
      type: 'select',
      id: 'link_style',
      label: 'Link style',
      options: [
        {
          value: 'primary',
          label: 'Primary button',
        },
        {
          value: 'secondary',
          label: 'Secondary button',
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
      default: 'full',
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
      id: 'heading_color',
      label: 'Heading color',
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
      id: 'terms_color',
      label: 'Terms color',
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
      id: 'modal_close_button_color',
      label: 'Close icon',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'mobile_modal_close_button_color',
      label: 'Close icon on mobile image',
      default: 'rgba(0,0,0,0)',
    },
  ],
  presets: [
    {
      name: 'Newsletter popup',
    },
  ],
};
