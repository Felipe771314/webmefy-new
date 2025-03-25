const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');
const deprecated = require('../common/deprecated.schema');

module.exports = {
  name: '/!\\ Featured product',
  class: 'shopify-section--featured-product',
  disabled_on: {
    templates: ['password'],
    groups: ['header', 'footer', 'custom.overlay'],
  },
  settings: [
    ...deprecated('Promotion blocks'),
    {
      type: 'product',
      id: 'product',
      label: 'Product',
    },
    {
      type: 'checkbox',
      id: 'show_vendor',
      label: 'Show vendor',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_sku',
      label: 'Show SKU',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'show_taxes_included',
      label: 'Show taxes included',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'show_product_rating',
      label: 'Show product rating',
      info: 'To display a rating, add a product rating app. [Learn more](https://help.shopify.com/en/manual/products/product-reviews/installation)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'show_share_buttons',
      label: 'Show share buttons',
      default: true,
    },
    {
      type: 'page',
      id: 'help_page',
      label: 'Help page',
      info: 'Feature a page to help your customers',
    },
    {
      type: 'header',
      content: 'Media',
    },
    {
      type: 'paragraph',
      content:
        'Learn more about [media types](https://help.shopify.com/en/manual/products/product-media)',
    },
    {
      type: 'checkbox',
      id: 'enable_video_autoplay',
      label: 'Enable video autoplay',
      info: 'Video are muted automatically to allow autoplay',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'enable_video_looping',
      label: 'Enable video looping',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'enable_image_zoom',
      label: 'Enable image zoom',
      info: 'Zoom does not show video nor 3D models.',
      default: true,
    },
    ...headings(),
    ...sectionLayout(),
    {
      type: 'checkbox',
      id: 'show_thumbnails_on_mobile',
      label: 'Show thumbnails on mobile',
      default: false,
    },
    {
      type: 'select',
      id: 'desktop_thumbnails_position',
      label: 'Desktop thumbnails position',
      options: [
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'bottom',
          label: 'Bottom',
        },
      ],
      default: 'bottom',
    },
    {
      type: 'select',
      id: 'transition_effect',
      label: 'Transition effect',
      options: [
        {
          value: 'slide',
          label: 'Slide',
        },
        {
          value: 'fade',
          label: 'Fade',
        },
      ],
      default: 'slide',
    },
    ...colors(),
  ],
  blocks: [
    {
      type: '@app',
    },
    {
      type: 'variant_picker',
      name: 'Variant picker',
      limit: 1,
      settings: [
        {
          type: 'checkbox',
          id: 'hide_sold_out_variants',
          label: 'Hide sold out variants',
          default: false,
        },
        {
          type: 'checkbox',
          id: 'hide_single_variant',
          label: 'Hide options if there is only one value',
          default: false,
        },
        {
          type: 'select',
          id: 'selector_mode',
          label: 'Selector type',
          options: [
            {
              value: 'block',
              label: 'Block',
            },
            {
              value: 'dropdown',
              label: 'Dropdown',
            },
          ],
          default: 'block',
        },
        {
          type: 'select',
          id: 'color_mode',
          label: 'Color selector type',
          info: 'Variant image mode requires that all variant have an associated image. [Learn more](https://help.shopify.com/en/manual/products/product-media/add-images-variants#add-images-to-existing-variants)',
          options: [
            {
              value: 'block',
              label: 'Block',
            },
            {
              value: 'dropdown',
              label: 'Dropdown',
            },
            {
              value: 'color',
              label: 'Color swatch',
            },
            {
              value: 'variant_image',
              label: 'Variant image',
            },
          ],
          default: 'color',
        },
        {
          type: 'page',
          id: 'size_chart_page',
          label: 'Size chart page',
          info: 'Feature a page for size option',
        },
      ],
    },
    {
      type: 'quantity_selector',
      name: 'Quantity selector',
      limit: 1,
    },
    {
      type: 'buy_buttons',
      name: 'Buy buttons',
      limit: 1,
      settings: [
        {
          type: 'checkbox',
          id: 'show_payment_button',
          label: 'Show dynamic checkout button',
          info: 'Each customer will see their preferred payment method from those available on your store, such as PayPal or Apple Pay. [Learn more](https://help.shopify.com/manual/using-themes/change-the-layout/dynamic-checkout)',
          default: true,
        },
        {
          type: 'color',
          id: 'atc_button_background',
          label: 'Add to cart background',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'atc_button_text_color',
          label: 'Add to cart color',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'buy_now_button_background',
          label: 'Buy now background',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'buy_now_button_text_color',
          label: 'Buy now color',
          default: 'rgba(0,0,0,0)',
        },
      ],
    },
    {
      type: 'description',
      name: 'Description',
      limit: 1,
    },
    {
      type: 'inventory',
      name: 'Inventory',
      limit: 1,
      settings: [
        {
          type: 'range',
          id: 'low_inventory_threshold',
          label: 'Low inventory threshold',
          info: 'Use low stock color when quantity is below the threshold. Choose 0 to always show in stock.',
          min: 0,
          max: 100,
          step: 1,
          default: 0,
        },
      ],
    },
    {
      type: 'text',
      name: 'Text',
      settings: [
        {
          type: 'richtext',
          id: 'text',
          label: 'Text',
        },
      ],
    },
    {
      type: 'image',
      name: 'Image',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
        },
        {
          type: 'select',
          id: 'image_alignment',
          label: 'Alignment',
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
          default: 'left',
        },
        {
          type: 'range',
          id: 'image_width',
          min: 50,
          max: 500,
          step: 10,
          unit: 'px',
          label: 'Image max width',
          default: 150,
        },
      ],
    },
    {
      type: 'button',
      name: 'Button',
      settings: [
        {
          type: 'paragraph',
          content: 'Create link to your contact page, external marketplace...',
        },
        {
          type: 'url',
          id: 'link',
          label: 'Link',
        },
        {
          type: 'text',
          id: 'text',
          label: 'Text',
        },
        {
          type: 'checkbox',
          id: 'stretch',
          label: 'Stretch button',
          default: true,
        },
        {
          type: 'color',
          id: 'background',
          label: 'Background',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'text_color',
          label: 'Text color',
          default: 'rgba(0,0,0,0)',
        },
      ],
    },
    {
      type: 'liquid',
      name: 'Custom Liquid',
      settings: [
        {
          type: 'liquid',
          id: 'liquid',
          label: 'Liquid',
          info: 'Add app snippets or other Liquid code to create advanced customizations.',
        },
      ],
    },
    {
      type: 'line_item_property',
      name: 'Line item property',
      settings: [
        {
          type: 'paragraph',
          content:
            'Line item properties are used to collect customization information for an item added to the cart.',
        },
        {
          type: 'text',
          id: 'label',
          label: 'Label',
          default: 'Your label',
        },
        {
          type: 'select',
          id: 'type',
          label: 'Type',
          options: [
            {
              value: 'text',
              label: 'Text',
            },
            {
              value: 'checkbox',
              label: 'Checkbox',
            },
          ],
          default: 'text',
        },
        {
          type: 'header',
          content: 'Text',
          info: 'Only applicable for line item property of type Text.',
        },
        {
          type: 'checkbox',
          id: 'required',
          label: 'Required',
          default: false,
        },
        {
          type: 'checkbox',
          id: 'allow_long_text',
          label: 'Allow long text',
          default: false,
        },
        {
          type: 'header',
          content: 'Checkbox',
          info: 'Only applicable for line item property of type Checkbox.',
        },
        {
          type: 'text',
          id: 'checked_value',
          label: 'Checked value',
          default: 'Yes',
        },
        {
          type: 'text',
          id: 'unchecked_value',
          label: 'Unchecked value',
          default: 'No',
        },
      ],
    },
  ],
};
