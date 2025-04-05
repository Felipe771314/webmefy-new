import heading from '../common/heading.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import richtextContent from '../common/richtext-content.schema';

module.exports = {
  name: 'Contact',
  class: 'shopify-section--contact-form',
  disabled_on: {
    groups: ['header', 'custom.overlay'],
  },
  settings: [
    {
      type: 'image_picker',
      id: 'image',
      label: 'Image',
      info: '1000 x 1000px .jpg recommended',
    },
    ...heading(),
    ...richtextContent(),
    {
      type: 'select',
      id: 'textblock_alignment',
      label: 'Text block alignment',
      info: "Only available if image doesn't exist",
      options: [
        {
          value: 'section__header--left',
          label: 'Left',
        },
        {
          value: '',
          label: 'Center',
        },
        {
          value: 'section__header--right',
          label: 'Right',
        },
      ],
      default: '',
    },
    {
      type: 'header',
      content: 'Block 1',
    },
    {
      type: 'text',
      id: 'text_1_heading',
      label: 'Heading',
    },
    {
      type: 'richtext',
      id: 'text_1_text',
      label: 'Text',
    },
    {
      type: 'header',
      content: 'Block 2',
    },
    {
      type: 'text',
      id: 'text_2_heading',
      label: 'Heading',
    },
    {
      type: 'richtext',
      id: 'text_2_text',
      label: 'Text',
    },
    {
      type: 'header',
      content: 'Config',
    },
    {
      type: 'checkbox',
      id: 'split_name',
      label: 'Split Name / Firstname',
      default: false,
    },
    {
      type: 'header',
      content: 'webhook (advanced)',
    },
    {
      type: 'checkbox',
      id: 'use_webhook',
      label: 'Use webhook',
      default: false,
    },
    {
      type: 'text',
      id: 'webhook_url',
      label: 'Webhook url',
    },
    {
      type: 'text',
      id: 'webhook_secret',
      label: 'Webhook secret',
    },
    ...sectionLayout(),
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
    ...colors(),
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
      type: 'text',
      name: 'Text field',
      settings: [
        {
          type: 'text',
          id: 'title',
          label: 'Name',
          default: 'Custom field',
        },
        {
          type: 'text',
          id: 'field_name',
          label: 'Field Name (optional)',
        },
        {
          type: 'checkbox',
          id: 'use_long_text',
          label: 'Use long text',
          default: false,
        },
        {
          type: 'checkbox',
          id: 'is_required',
          label: 'Field is required',
          default: false,
        },
      ],
    },
    {
      type: 'hidden-language',
      name: 'Language (hidden)',
      limit: 1,
      settings: [
        {
          type: 'checkbox',
          id: 'use_language_code',
          label: 'Use ISO Format',
          default: false,
        },
      ],
    },
    {
      type: 'hidden-country',
      name: 'Country (hidden)',
      limit: 1,
      settings: [
        {
          type: 'checkbox',
          id: 'use_country_code',
          label: 'Use ISO Format',
          default: false,
        },
      ],
    },
    {
      type: 'hidden-market',
      name: 'Market (hidden)',
      limit: 1,
    },
    {
      type: 'dropdown',
      name: 'Dropdown',
      settings: [
        {
          type: 'text',
          id: 'title',
          label: 'Name',
          default: 'Custom field',
        },
        {
          type: 'text',
          id: 'field_name',
          label: 'Field Name (optional)',
        },
        {
          type: 'text',
          id: 'values',
          label: 'Values',
          info: 'Separate each value by a comma.',
          default: 'value 1, value 2, value 3',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'Contact form',
      settings: {},
    },
  ],
};
