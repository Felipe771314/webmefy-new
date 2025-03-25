const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Newsletter - Social',
  class: 'shopify-section--newsletter-social',
  settings: [
    ...headings(),
    ...sectionLayout(),
    {
      type: 'paragraph',
      content:
        'Customers who subscribe will have their email address added to the "accepts marketing" [customer list](/admin/customers?query=&accepts_marketing=1).',
    },
    {
      type: 'text',
      id: 'newsletter_title',
      label: 'Heading',
      default: 'Newsletter',
    },
    {
      type: 'richtext',
      id: 'newsletter_content',
      label: 'Content',
      default: '<p>A short sentence describing what someone will receive by subscribing</p>',
    },
    {
      type: 'text',
      id: 'social_title',
      label: 'Heading',
      default: 'Social',
    },
    {
      type: 'text',
      id: 'blog_title',
      label: 'Blog title',
      default: 'Le blog',
    },
    {
      type: 'url',
      id: 'blog_link',
      label: 'Blog link',
      default: '/',
    },
    ...colors(),
  ],
  presets: [
    {
      name: 'Newsletter - Social',
    },
  ],
};
