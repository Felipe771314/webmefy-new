const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');
const deprecated = require('../common/deprecated.schema');

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
