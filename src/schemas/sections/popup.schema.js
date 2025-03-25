module.exports = {
  name: 'Popup',
  class: 'shopify-section--popup',
  enabled_on: {
    groups: ['custom.overlay'],
  },
  limit: 1,
  settings: [
    {
      type: 'paragraph',
      content:
        'Customers who subscribe will have their email address added to the "accepts marketing" [customer list](/admin/customers?query=&accepts_marketing=1).',
    },
    {
      type: 'checkbox',
      id: 'enable',
      label: 'Enable',
      default: false,
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
  ],
  presets: [
    {
      name: 'Popup',
    },
  ],
};
