import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import richtextContent from '../common/richtext-content.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'FAQ',
  class: 'shopify-section--faq',
  disabled_on: {
    templates: ['password'],
    groups: ['header', 'footer', 'custom.overlay'],
  },
  settings: [
    {
      type: 'checkbox',
      id: 'show_navigation',
      label: 'Show navigation',
      default: false,
    },
    ...headings(),
    ...richtextContent(),
    ...sectionLayout(),
    {
      type: 'select',
      id: 'text_width',
      label: 'Text width',
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
        {
          value: 'fill',
          label: 'Fill screen',
        },
      ],
      default: 'medium',
    },
    ...colors(),
  ],
  blocks: [
    {
      type: 'category',
      name: 'Category',
      settings: [
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Category',
        },
        {
          type: 'select',
          id: 'heading_tag',
          label: 'Heading tag',
          options: [
            {
              value: 'h1',
              label: 'H1',
            },
            {
              value: 'h2',
              label: 'H2',
            },
            {
              value: 'h3',
              label: 'H3',
            },
            {
              value: 'h4',
              label: 'H4',
            },
            {
              value: 'h5',
              label: 'H5',
            },
            {
              value: 'h6',
              label: 'H6',
            },
            {
              value: 'span',
              label: 'SPAN',
            },
          ],
          default: 'h3',
        },
        {
          type: 'select',
          id: 'heading_size',
          label: 'Heading size',
          options: [
            {
              value: 'h1',
              label: 'H1',
            },
            {
              value: 'h2',
              label: 'H2',
            },
            {
              value: 'h3',
              label: 'H3',
            },
            {
              value: 'h4',
              label: 'H4',
            },
            {
              value: 'h5',
              label: 'H5',
            },
            {
              value: 'h6',
              label: 'H6',
            },
            {
              value: 'span',
              label: 'SPAN',
            },
          ],
          default: 'h6',
        },
      ],
    },
    {
      type: 'question',
      name: 'Question',
      settings: [
        {
          type: 'text',
          id: 'title',
          label: 'Question',
          default: 'About your shop',
        },
        {
          type: 'richtext',
          id: 'answer',
          label: 'Answer',
          default:
            '<p>Write content to help your customers to better understand your products or policies.</p>',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'FAQ',
      blocks: [
        {
          type: 'category',
          settings: {
            title: 'Shipping',
          },
        },
        {
          type: 'question',
          settings: {
            title: 'Do you ship overseas?',
            answer:
              '<p>Yes, we ship all over the world. Shipping costs will apply, and will be added at checkout. We run discounts and promotions all year, so stay tuned for exclusive deals.</p>',
          },
        },
        {
          type: 'question',
          settings: {
            title: 'How long will it take to get my order?',
            answer:
              '<p>It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email.</p>',
          },
        },
        {
          type: 'category',
          settings: {
            title: 'Other',
          },
        },
        {
          type: 'question',
          settings: {
            title: 'Any question?',
            answer:
              '<p>You can contact us through our contact page! We will be happy to assist you.</p>',
          },
        },
      ],
    },
  ],
};
