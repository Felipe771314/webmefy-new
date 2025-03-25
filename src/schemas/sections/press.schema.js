const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');
const deprecated = require('../common/deprecated.schema');

module.exports = {
  name: '/!\\ Press',
  class: 'shopify-section--press',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  max_blocks: 6,
  settings: [
    ...deprecated('Promotion blocks'),
    {
      type: 'checkbox',
      id: 'reveal_on_scroll',
      label: 'Reveal on scroll',
      info: 'Show animation when section becomes visible.',
      default: true,
    },
    ...headings(),
    ...sectionLayout(),
    ...colors(),
  ],
  blocks: [
    {
      type: 'item',
      name: 'Press testimonial',
      settings: [
        {
          type: 'image_picker',
          id: 'logo',
          label: 'Logo',
          info: '300 x 75px .png recommended',
        },
        {
          type: 'range',
          id: 'logo_width',
          min: 25,
          max: 150,
          step: 5,
          unit: 'px',
          label: 'Logo width',
          default: 100,
        },
        {
          type: 'text',
          id: 'content',
          label: 'Content',
          default: 'Write some content about what they are saying about your store.',
        },
      ],
    },
  ],
};
