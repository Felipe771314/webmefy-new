import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Custom HTML',
  class: 'shopify-section--custom-html',
  settings: [
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
  presets: [
    {
      name: 'Custom HTML',
    },
  ],
};
