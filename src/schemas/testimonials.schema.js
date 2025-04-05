import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import deprecated from '../common/deprecated.schema';

module.exports = {
  name: '/!\\ Testimonials',
  class: 'shopify-section--testimonials',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
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
      type: 'testimonial',
      name: 'Testimonial',
      settings: [
        {
          type: 'text',
          id: 'content',
          label: 'Content',
          default: 'Write some content about what they are saying about your store.',
          info: 'Section size will adjust to the tallest content. Try to keep each testimonial a similar size.',
        },
        {
          type: 'text',
          id: 'author',
          label: 'Author',
          default: 'John S.',
        },
      ],
    },
  ],
};
