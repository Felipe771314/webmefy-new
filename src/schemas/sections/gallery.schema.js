const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Gallery',
  class: 'shopify-section--gallery',
  disabled_on: {
    groups: ['header', 'footer', 'custom.overlay'],
  },
  settings: [
    ...headings(),
    {
      type: 'header',
      content: 'Navigation',
    },
    {
      type: 'checkbox',
      id: 'show_arrows',
      label: 'Show navigation arrows',
      default: true,
    },
    ...sectionLayout(),
    ...colors(),
  ],
  blocks: [
    {
      type: 'image',
      name: 'Image',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
          info: '1500 x 1800 px .jpg recommended',
        },
        {
          type: 'richtext',
          id: 'caption',
          label: 'Caption',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'Gallery',
      blocks: [
        {
          type: 'image',
        },
        {
          type: 'image',
        },
        {
          type: 'image',
        },
      ],
      settings: {},
    },
  ],
};
