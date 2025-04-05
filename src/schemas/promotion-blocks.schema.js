import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';
import promotionBlock from '../blocks/promotion-block-settings.schema';
import promotionBlockBasic from '../blocks/promotion-block-basic-settings.schema';
import featuredProducts from '../blocks/promotion-block-featured-products-settings.schema';
import afp_settings from '../common/afp.schema';
import toggleVisibility from '../common/toggle-visiblity.schema';

module.exports = {
  name: 'Promotion blocks',
  class: 'shopify-section--promotion-blocks',
  disabled_on: {
    groups: ['header', 'custom.overlay'],
  },
  max_blocks: 12,
  settings: [
    ...headings(),
    ...sectionLayout(),
    {
      type: 'select',
      id: 'blocks_spacing',
      label: 'Blocks spacing',
      options: [
        {
          value: 'xlarge',
          label: 'XLarge',
        },
        {
          value: 'large',
          label: 'Large',
        },
        {
          value: 'default',
          label: 'Normal',
        },
        {
          value: 'small',
          label: 'Small',
        },
        {
          value: 'xsmall',
          label: 'XSmall',
        },
        {
          value: 'xxsmall',
          label: 'XXSmall',
        },
        {
          value: 'none',
          label: 'None',
        },
      ],
      default: 'default',
    },
    {
      type: 'text',
      id: 'blocks_spacing_custom_desk',
      label: '[Desktop] Blocks spacing',
      info: 'If set overrides desktop spacing',
    },
    {
      type: 'text',
      id: 'blocks_spacing_custom_mobile',
      label: '[Mobile] Blocks spacing',
      info: 'If set overrides mobile spacing',
    },
    {
      type: 'select',
      id: 'section_size',
      label: 'Blocks min height',
      options: [
        {
          value: '',
          label: 'None',
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
      default: '',
    },
    {
      type: 'select',
      id: 'section_layout',
      label: 'Section layout',
      options: [
        {
          value: 'flex_grid',
          label: 'Flex Grid',
        },
        {
          value: 'grid',
          label: 'Grid',
        },
        {
          value: 'columns',
          label: 'Columns',
        },
      ],
      default: 'flex_grid',
    },
    {
      type: 'range',
      id: 'section_columns_desktop',
      label: 'Columns desktop',
      min: 1,
      max: 12,
      step: 1,
      default: 3,
    },
    {
      type: 'checkbox',
      id: 'stack_on_mobile',
      label: 'Stack on mobile',
      default: true,
    },
    {
      type: 'select',
      id: 'section_columns_mobile',
      label: 'Columns mobile',
      options: [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
        {
          value: '6',
          label: '6',
        },
      ],
      default: '1',
    },
    {
      type: 'header',
      content: 'Mobile carousel options',
      info: 'Only applied if items are not stacked',
    },
    {
      type: 'checkbox',
      id: 'show_dots_nav',
      label: 'Show dots navigation',
      default: true,
    },
    {
      type: 'select',
      id: 'dots_nav_position',
      label: 'Dots nav position',
      options: [
        {
          value: 'inside',
          label: 'Inside',
        },
        {
          value: 'outside',
          label: 'Outside',
        },
      ],
      default: 'inside',
    },
    {
      type: 'color',
      id: 'dots_nav_color',
      label: 'Dots nav color',
      default: '#FFFFFF',
    },
    {
      type: 'checkbox',
      id: 'carousel_item_fullwidth',
      label: 'Fullwidth carousel item',
      default: true,
    },
    ...colors(),
    {
      type: 'header',
      content: 'Advanced',
    },
    {
      type: 'text',
      id: 'extra_css_class',
      label: 'Extra CSS class',
    },
    ...toggleVisibility(),
  ],
  blocks: [
    {
      type: 'basic_media',
      name: '[Basic] Media with text',
      settings: [...promotionBlockBasic()],
    },
    {
      type: 'basic_featured_products',
      name: '[Basic] Featured products',
      settings: [...featuredProducts()],
    },
    {
      type: 'quote',
      name: 'Quote',
      settings: [
        {
          type: 'checkbox',
          id: 'highlight',
          label: 'Highlight tile',
          info: 'A highlighted tile takes bigger space. Only has effect on desktop. Do not highlight more than 1 item per row.',
          default: false,
        },
        {
          type: 'text',
          id: 'subheading',
          label: 'Subheading',
          default: 'Subheading',
        },
        {
          type: 'text',
          id: 'content',
          label: 'Content',
          default: 'Use this text to share information about your brand with your customers.',
        },
        {
          type: 'text',
          id: 'author',
          label: 'Author',
          default: 'John S.',
        },
        {
          type: 'color',
          id: 'background',
          label: 'Background',
          default: '#f7f8fd',
        },
        {
          type: 'color',
          id: 'text_color',
          label: 'Text color',
          default: '#1e316a',
        },
      ],
    },
    {
      type: 'newsletter',
      name: 'Newsletter',
      limit: 1,
      settings: [
        {
          type: 'paragraph',
          content:
            'Customers who subscribe will have their email address added to the "accepts marketing" [customer list](/admin/customers?query=&accepts_marketing=1).',
        },
        {
          type: 'checkbox',
          id: 'highlight',
          label: 'Highlight tile',
          info: 'A highlighted tile takes bigger space. Only has effect on desktop. Do not highlight more than 1 item per row.',
          default: false,
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Join us',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Rich text',
          default: '<p>A short sentence describing what someone will receive by subscribing</p>',
        },
        {
          type: 'select',
          id: 'text_position',
          label: 'Text position',
          options: [
            {
              value: 'top_left',
              label: 'Top left',
            },
            {
              value: 'top_center',
              label: 'Top center',
            },
            {
              value: 'top_right',
              label: 'Top right',
            },
            {
              value: 'middle_left',
              label: 'Middle left',
            },
            {
              value: 'middle_center',
              label: 'Middle center',
            },
            {
              value: 'middle_right',
              label: 'Middle right',
            },
            {
              value: 'bottom_left',
              label: 'Bottom left',
            },
            {
              value: 'bottom_center',
              label: 'Bottom center',
            },
            {
              value: 'bottom_right',
              label: 'Bottom right',
            },
          ],
          default: 'middle_center',
        },
        {
          type: 'color',
          id: 'background',
          label: 'Background',
          default: '#f7f8fd',
        },
        {
          type: 'color',
          id: 'text_color',
          label: 'Text color',
          default: '#1e316a',
        },
        {
          type: 'color',
          id: 'button_background',
          label: 'Button background',
          default: '#ffffff',
        },
        {
          type: 'color',
          id: 'button_text_color',
          label: 'Button text color',
          default: '#1e316a',
        },
      ],
    },
    {
      type: 'look',
      name: 'Look',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
          info: '2160 x 1000px .jpg recommended',
        },
        {
          type: 'image_picker',
          id: 'mobile_image',
          label: 'Mobile image',
          info: '1000 x 800px .jpg recommended. Default image is used if none is selected. To position the hotspots precisely, switch to mobile mode.',
        },
        {
          type: 'select',
          id: 'dot_type',
          label: 'Hotspot style',
          options: [
            {
              value: 'normal',
              label: 'Normal',
            },
            {
              value: 'inverted',
              label: 'Inverted',
            },
          ],
          default: 'normal',
        },
        {
          type: 'select',
          id: 'btn_style',
          label: 'Button style',
          options: [
            {
              label: 'Dot',
              value: 'dot',
            },
            {
              label: 'Plus',
              value: 'plus',
            },
          ],
          default: 'dot',
        },
        {
          type: 'header',
          content: 'Product 1',
        },
        {
          type: 'product',
          id: 'product_1',
          label: 'Product',
        },
        {
          type: 'range',
          id: 'product_1_horizontal_position',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Horizontal position',
          default: 30,
        },
        {
          type: 'range',
          id: 'product_1_vertical_position',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Vertical position',
          default: 30,
        },
        {
          type: 'range',
          id: 'product_1_horizontal_position_mobile',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Horizontal position (mobile image)',
          default: 30,
        },
        {
          type: 'range',
          id: 'product_1_vertical_position_mobile',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Vertical position (mobile image)',
          default: 30,
        },
        {
          type: 'header',
          content: 'Product 2',
        },
        {
          type: 'product',
          id: 'product_2',
          label: 'Product',
        },
        {
          type: 'range',
          id: 'product_2_horizontal_position',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Horizontal position',
          default: 50,
        },
        {
          type: 'range',
          id: 'product_2_vertical_position',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Vertical position',
          default: 50,
        },
        {
          type: 'range',
          id: 'product_2_horizontal_position_mobile',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Horizontal position (mobile image)',
          default: 50,
        },
        {
          type: 'range',
          id: 'product_2_vertical_position_mobile',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Vertical position (mobile image)',
          default: 50,
        },
        {
          type: 'header',
          content: 'Product 3',
        },
        {
          type: 'product',
          id: 'product_3',
          label: 'Product',
        },
        {
          type: 'range',
          id: 'product_3_horizontal_position',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Horizontal position',
          default: 70,
        },
        {
          type: 'range',
          id: 'product_3_vertical_position',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Vertical position',
          default: 70,
        },
        {
          type: 'range',
          id: 'product_3_horizontal_position_mobile',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Horizontal position (mobile image)',
          default: 70,
        },
        {
          type: 'range',
          id: 'product_3_vertical_position_mobile',
          min: 5,
          max: 95,
          step: 1,
          unit: '%',
          label: 'Vertical position (mobile image)',
          default: 70,
        },
        {
          type: 'header',
          content: 'Layout',
        },
        {
          type: 'checkbox',
          id: 'highlight',
          label: 'Highlight tile',
          info: 'A highlighted tile takes bigger space.',
          default: false,
        },
        {
          type: 'header',
          content: 'Advanced grid layout',
          info: "Only works with 'grid layout' on the section",
        },
        {
          type: 'range',
          id: 'col_size',
          label: 'Block col size (width)',
          min: 1,
          max: 12,
          step: 1,
          default: 1,
        },
        {
          type: 'range',
          id: 'row_size',
          label: 'Block row size (height)',
          min: 1,
          max: 10,
          step: 1,
          default: 1,
        },
      ],
    },
    {
      type: 'media',
      name: '[Adv] Media with text',
      settings: [...promotionBlock(), ...afp_settings()],
    },
    {
      type: 'featured_products',
      name: '[Adv] Featured products',
      settings: [...featuredProducts(), ...afp_settings()],
    },
  ],
  presets: [
    {
      name: 'Promotion blocks',
      settings: {},
      blocks: [
        {
          type: 'basic_media',
        },
        {
          type: 'basic_media',
        },
        {
          type: 'basic_media',
        },
      ],
    },
  ],
};
