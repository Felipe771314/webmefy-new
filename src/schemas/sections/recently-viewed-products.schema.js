const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Recently viewed products',
  class: 'shopify-section--recently-viewed-products',
  disabled_on: {
    templates: ['password'],
    groups: ['header', 'custom.overlay', 'footer'],
  },
  settings: [
    {
      type: 'paragraph',
      content: 'Section is hidden if no products have been visited.',
    },
    ...headings(),
    ...sectionLayout(),
    {
      type: 'range',
      id: 'products_count',
      min: 4,
      max: 20,
      label: 'Products count',
      default: 4,
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
      id: 'text_color',
      label: 'Text',
      default: 'rgba(0,0,0,0)',
    },
  ],
  presets: [
    {
      name: 'Recently viewed products',
    },
  ],
};
