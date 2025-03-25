const headings = require('../common/headings.schema');
const headingsAsideLayout = require('../common/headings-aside-layout.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Related products',
  class: 'shopify-section--product-recommendations',
  enabled_on: {
    templates: ['product'],
  },
  settings: [
    {
      type: 'paragraph',
      content:
        'Dynamic recommendations change and improve with time. Create manual product recommendations using the Shopify Search & Discovery app. [Learn more](https://help.shopify.com/en/manual/online-store/search-and-discovery/product-recommendations).',
    },
    {
      type: 'range',
      id: 'recommendations_count',
      min: 4,
      max: 10,
      label: 'Recommendations count',
      default: 4,
    },
    {
      type: 'select',
      label: 'Recommendation type',
      id: 'recommendation_type',
      options: [
        {
          label: 'Related',
          value: 'related',
        },
        {
          label: 'Complementary',
          value: 'complementary',
        },
      ],
      default: 'related',
    },
    {
      type: 'header',
      content: 'Packshot image',
    },
    {
      type: 'checkbox',
      id: 'enable_packshot_product_recommendations',
      label: 'Enable packshot image',
      default: false,
      info: 'Works only for complementary products',
    },
    ...headings(),
    ...headingsAsideLayout(),
    ...sectionLayout(),
    ...colors(),
  ],
  presets: [
    {
      name: 'Related products',
    },
  ],
};
