import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import richtextContent from '../common/richtext-content.schema';
import deprecated from '../common/deprecated.schema';

module.exports = {
  name: '/!\\ Multi-column',
  class: 'shopify-section--multi-column',
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
    {
      type: 'checkbox',
      id: 'stack_items',
      label: 'Stack items',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'always_show',
      label: 'Always show navigation arrows',
      default: false,
    },
    ...headings(),
    ...richtextContent(),
    ...sectionLayout(),
    {
      type: 'select',
      id: 'column_alignment',
      label: 'Column alignment',
      options: [
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'right',
          label: 'Right',
        },
      ],
      default: 'center',
    },
    {
      type: 'select',
      id: 'mobile_item_size',
      label: 'Mobile/tablet column size',
      options: [
        {
          value: 'small',
          label: 'Small',
        },
        {
          value: 'medium',
          label: 'Medium',
        },
        {
          value: 'large',
          label: 'Large',
        },
      ],
      default: 'medium',
    },
    {
      type: 'select',
      id: 'desktop_item_size',
      label: 'Desktop column size',
      options: [
        {
          value: 'pico',
          label: 'X-Small',
        },
        {
          value: 'small',
          label: 'Small',
        },
        {
          value: 'medium',
          label: 'Medium',
        },
        {
          value: 'large',
          label: 'Large',
        },
      ],
      default: 'medium',
    },
    ...colors(),
  ],
  blocks: [
    {
      name: 'Column',
      type: 'item',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
          info: '1200 x 1200px .jpg recommended',
        },
        {
          type: 'range',
          id: 'image_width',
          min: 10,
          max: 100,
          unit: '%',
          step: 1,
          label: 'Image width',
          default: 100,
        },
        {
          type: 'color',
          id: 'image_border',
          label: 'Image border',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Your content',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default:
            '<p>Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.</p>',
        },
        {
          type: 'text',
          id: 'link_text',
          label: 'Link text',
        },
        {
          type: 'url',
          id: 'link_url',
          label: 'Link',
        },
        {
          type: 'select',
          id: 'link_style',
          label: 'Link style',
          options: [
            {
              value: 'link',
              label: 'Link',
            },
            {
              value: 'button',
              label: 'Button',
            },
          ],
          default: 'link',
        },
        {
          type: 'select',
          id: 'text_alignment',
          label: 'Text alignment',
          options: [
            {
              value: 'left',
              label: 'Left',
            },
            {
              value: 'center',
              label: 'Center',
            },
            {
              value: 'right',
              label: 'Right',
            },
          ],
          default: 'center',
        },
        {
          type: 'select',
          id: 'vertical_alignment',
          label: 'Vertical alignment',
          options: [
            {
              value: 'start',
              label: 'Top',
            },
            {
              value: 'center',
              label: 'Center',
            },
            {
              value: 'end',
              label: 'Bottom',
            },
          ],
          default: 'start',
        },
      ],
    },
  ],
};
