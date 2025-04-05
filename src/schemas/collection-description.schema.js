import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import deprecated from '../common/deprecated.schema';

module.exports = {
  name: '/!\\Collection description',
  class: 'shopify-section--collection-description',
  enabled_on: {
    templates: ['collection'],
  },
  settings: [
    ...deprecated('Collection Promotion Ban'),
    ...headings(),
    {
      type: 'header',
      content: 'Content',
    },
    {
      type: 'select',
      id: 'description_alignment',
      label: 'Description position',
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
      default: 'left',
    },
    {
      type: 'richtext',
      id: 'extra_content',
      label: 'Extra content',
    },
    {
      type: 'select',
      id: 'extra_content_position',
      label: 'Extra content position',
      options: [
        {
          label: 'Top',
          value: 'column-reverse',
        },
        {
          label: 'Bottom',
          value: 'column',
        },
      ],
      default: 'column',
    },
    {
      type: 'range',
      id: 'collection_description_spacer',
      label: 'Spacing',
      min: 0,
      max: 50,
      step: 1,
      default: 0,
      info: 'Only works with extra content',
    },
    ...sectionLayout(),
    ...colors(),
  ],
};
