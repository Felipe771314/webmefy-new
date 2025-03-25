const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Custom Liquid',
  class: 'shopify-section--custom-liquid',
  settings: [
    ...headings(),
    {
      type: 'header',
      content: 'Content',
    },
    {
      type: 'liquid',
      id: 'liquid',
      label: 'Liquid',
      info: 'Add app snippets or other Liquid code to create advanced customizations.',
      default: '<p style="text-align: center">Write or copy/paste Liquid code</p>',
    },
    ...sectionLayout(),
    ...colors(),
  ],
  presets: [
    {
      name: 'Custom Liquid',
    },
  ],
};
