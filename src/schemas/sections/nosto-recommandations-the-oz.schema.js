const headings = require('../common/headings.schema');
const headingsAsideLayout = require('../common/headings-aside-layout.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Nosto recommandations',
  class: 'shopify-section--nosto-recommandations',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  settings: [
    {
      type: 'paragraph',
      content: 'Add a Nosto block with cross sales',
    },
    {
      type: 'select',
      id: 'selected_id',
      label: 'Nosto Block Id',
      options: [
        {
          value: 'frontpage-nosto-1',
          label: 'frontpage-nosto-1',
        },
        {
          value: 'frontpage-nosto-2',
          label: 'frontpage-nosto-2',
        },
        {
          value: 'frontpage-nosto-3',
          label: 'frontpage-nosto-3',
        },
        {
          value: 'frontpage-nosto-4',
          label: 'frontpage-nosto-4',
        },
        {
          value: 'categorypage-nosto-1',
          label: 'categorypage-nosto-1',
        },
        {
          value: 'categorypage-nosto-2',
          label: 'categorypage-nosto-2',
        },
        {
          value: 'productpage-nosto-1',
          label: 'productpage-nosto-1',
        },
        {
          value: 'productpage-nosto-2',
          label: 'productpage-nosto-2',
        },
        {
          value: 'productpage-nosto-3',
          label: 'productpage-nosto-3',
        },
        {
          value: 'cartpage-nosto-1',
          label: 'cartpage-nosto-1',
        },
        {
          value: 'cartpage-nosto-2',
          label: 'cartpage-nosto-2',
        },
        {
          value: 'cartpage-nosto-3',
          label: 'cartpage-nosto-3',
        },
        {
          value: 'searchpage-nosto-1',
          label: 'searchpage-nosto-1',
        },
        {
          value: 'searchpage-nosto-2',
          label: 'searchpage-nosto-2',
        },
        {
          value: 'notfound-nosto-1',
          label: 'notfound-nosto-1',
        },
        {
          value: 'notfound-nosto-2',
          label: 'notfound-nosto-2',
        },
      ],
      default: 'frontpage-nosto-1',
    },
    {
      type: 'text',
      id: 'custom_id',
      label: 'Nosto Custom Block Id',
      info: 'If setted, override id selection',
    },

    {
      type: 'range',
      id: 'recommendations_count',
      min: 4,
      max: 10,
      label: 'Recommendations count',
      default: 4,
    },
    ...headings(),
    ...headingsAsideLayout(),
    ...sectionLayout(),
    ...colors(),
  ],
  presets: [
    {
      name: 'Nosto Recommandations',
    },
  ],
};
