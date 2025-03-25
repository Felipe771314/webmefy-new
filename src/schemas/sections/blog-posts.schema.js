const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Blog posts',
  class: 'shopify-section--blog-posts',
  disabled_on: {
    groups: ['header', 'footer', 'custom.overlay'],
  },
  settings: [
    ...headings(),
    {
      type: 'header',
      content: 'Content',
    },
    {
      type: 'blog',
      id: 'blog',
      label: 'Blog',
    },
    {
      type: 'range',
      id: 'articles_count',
      label: 'Blog posts to show',
      info: 'Layout automatically adapts based on the number of blog posts.',
      min: 1,
      max: 4,
      step: 1,
      default: 3,
    },
    {
      type: 'checkbox',
      id: 'stack_mobile',
      label: 'Stack on mobile',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'show_category',
      label: 'Show category',
      info: "The first article's tag will be shown as category.",
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_excerpt',
      label: 'Show excerpt',
      info: 'Change excerpts by editing your blog posts. [Learn more](https://help.shopify.com/en/manual/online-store/blogs/writing-blogs#display-an-excerpt-from-a-blog-post)',
      default: false,
    },
    ...sectionLayout(),
    ...colors(),
  ],
  presets: [
    {
      name: 'Blog posts',
      settings: {
        blog: 'news',
      },
    },
  ],
};
