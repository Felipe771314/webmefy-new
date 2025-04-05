import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import deprecated from '../common/deprecated.schema';

module.exports = {
  name: '/!\\ Collection list',
  class: 'shopify-section--collection-list',
  disabled_on: {
    templates: ['password'],
    groups: ['header', 'footer'],
  },
  settings: [
    ...deprecated('Promotion blocks'),
    ...headings(),
    {
      type: 'header',
      content: 'Content',
    },
    {
      type: 'html',
      id: 'html',
      label: 'HTML',
      default: '<p style="text-align: center">Write or copy/paste HTML code</p>',
    },
    ...sectionLayout(),
    ...colors(),
  ],
};
