import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Instafeed App TheOz',
  class: 'shopify-section--instafeed',
  settings: [
    {
      type: 'paragraph',
      content: '[Gérer l’application](/admin/apps/instafeed)',
    },
    {
      type: 'header',
      content: 'Instagram link',
    },
    {
      type: 'url',
      id: 'instagram_account_link',
      label: 'Instagram account link',
    },
    {
      type: 'text',
      id: 'instagram_account_link_text',
      label: 'Instagram account link text',
    },
    {
      type: 'select',
      id: 'instagram_link_size',
      label: 'Instagram link size',
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
      ],
      default: 'h2',
    },
    {
      type: 'text',
      id: 'instagram_link_custom_font_size',
      label: '[desktop] Instagram link custom font size',
      info: 'Override CSS font-size for desktop',
    },
    {
      type: 'text',
      id: 'instagram_link_custom_font_size_mobile',
      label: '[mobile] Instagram link custom font size',
      info: 'Override CSS font-size for mobile',
    },
    {
      type: 'select',
      id: 'instagram_link_transform',
      label: 'Instagram link text transform',
      options: [
        {
          value: '',
          label: 'Default',
        },
        {
          value: 'uppercase',
          label: 'Uppercase',
        },
        {
          value: 'lowercase',
          label: 'Lowercase',
        },
        {
          value: 'capitalize',
          label: 'Capitalize',
        },
        {
          value: 'none',
          label: 'None',
        },
      ],
      default: '',
    },
    {
      type: 'select',
      id: 'instagram_link_weight',
      label: 'Instagram link font weight',
      info: `May not work, depends on the typography`,
      options: [
        {
          value: 'default',
          label: 'Default',
        },
        {
          value: 'light',
          label: 'Light',
        },
        {
          value: 'normal',
          label: 'Normal',
        },
        {
          value: 'bold',
          label: 'Bold',
        },
      ],
      default: 'default',
    },
    {
      type: 'select',
      id: 'instagram_link_typo',
      label: ' Instagram link typography',
      options: [
        {
          value: 'default',
          label: 'Default',
        },
        {
          value: 'primary',
          label: 'Heading primary',
        },
        {
          value: 'secondary',
          label: 'Heading secondary',
        },
        {
          value: 'body-text',
          label: 'Body text',
        },
      ],
      default: 'default',
    },
    {
      type: 'select',
      id: 'instagram_account_link_mobile_position',
      label: 'Instagram account link mobile position',
      options: [
        {
          label: 'Top',
          value: 'link_top',
        },
        {
          label: 'Bottom',
          value: 'link_bottom',
        },
      ],
    },
    {
      type: 'select',
      id: 'instagram_account_mobile_alignment',
      label: '[mobile] Instagram text alignment',
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
    ...headings(),
    ...sectionLayout(),
    {
      type: 'range',
      id: 'feed_width',
      min: 50,
      max: 100,
      step: 5,
      unit: '%',
      label: 'Feed Width',
      default: 100,
    },
    ...colors(),
    {
      type: 'textarea',
      id: 'html_area',
      label: 'Custom Code (optional)',
    },
  ],
  presets: [
    {
      name: 'Instafeed App TheOz',
      category: 'Instagram Feed',
    },
  ],
};
