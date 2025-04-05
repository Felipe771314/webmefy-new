import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import deprecated from '../common/deprecated.schema';

module.exports = {
  name: '/!\\Feat collections Aside',
  class: 'shopify-section--feat-collections--aside',
  disabled_on: {
    templates: ['password'],
    groups: ['header', 'footer', 'custom.overlay'],
  },
  settings: [
    ...deprecated('Featured collection'),
    {
      type: 'header',
      content: 'Content',
    },
    {
      type: 'collection',
      id: 'collection',
      label: 'Collection',
    },
    {
      type: 'text',
      id: 'aside_title',
      label: 'Title',
    },
    {
      type: 'select',
      id: 'aside_title_position',
      label: 'Title position',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      default: 'center',
    },
    ...sectionLayout(),
    {
      type: 'range',
      id: 'products_count',
      label: 'Products to show',
      min: 4,
      max: 50,
      step: 1,
      default: 8,
    },
    {
      type: 'range',
      id: 'products_per_row',
      label: 'Products per row (desktop)',
      min: 2,
      max: 6,
      step: 1,
      default: 4,
    },
    {
      type: 'checkbox',
      id: 'show_cta',
      label: 'Show add to cart below info',
      info: 'If enabled, we recommend using 4 products per row at maximum.',
      default: false,
    },
    ...colors(),
  ],
};
