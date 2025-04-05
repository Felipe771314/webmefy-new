import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Sub-collection list',
  class: 'shopify-section--sub-collection-list',
  settings: [
    {
      type: 'collection',
      id: 'section_collection',
      label: 'Collection',
    },
    {
      type: 'checkbox',
      id: 'subcollections_hide_root_title',
      label: 'Hide sub-collection root title',
      default: false,
    },
    {
      type: 'link_list',
      id: 'breadcrumb_links',
      label: 'Custom breadcrumb links',
    },
    {
      type: 'header',
      content: 'Image',
    },
    {
      type: 'checkbox',
      id: 'show_subcollection_img',
      label: 'Show sub collection image',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'mobile_hide_subcollection_img',
      label: 'Hide sub-collection images on mobile',
      default: false,
    },
    {
      type: 'text',
      id: 'metafield_title',
      label: 'Metafield title',
      default: 'custom.subcollection_img',
    },
    {
      type: 'checkbox',
      id: 'subcollection_img_zoom',
      label: 'Disable image zoom',
      default: false,
    },
    {
      type: 'select',
      id: 'subcollection_image_border_radius',
      label: 'Sub-collection image border',
      options: [
        {
          label: 'Square',
          value: '0',
        },
        {
          label: 'Circle',
          value: '100',
        },
      ],
      default: '100',
    },
    {
      type: 'select',
      id: 'show_subcollection_title_position',
      label: 'Image position',
      options: [
        {
          value: 'column-reverse',
          label: 'Above text',
        },
        {
          value: 'column',
          label: 'Below text',
        },
      ],
      default: 'column-reverse',
    },
    {
      type: 'checkbox',
      id: 'subcollections_hide_title',
      label: 'Hide sub-collection title',
      default: false,
    },
    {
      type: 'header',
      content: 'Button',
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
          value: 'primary',
          label: 'Primary button',
        },
        {
          value: 'secondary',
          label: 'Secondary button',
        },
        {
          value: 'transparent',
          label: 'Transparent',
        },
      ],
      default: 'primary',
    },
    {
      type: 'header',
      content: 'Items layout',
    },
    {
      type: 'text',
      id: 'items_spacing',
      label: 'Items spacing',
      default: '12px',
    },
    {
      type: 'text',
      id: 'items_spacing_mobile',
      label: '[Mobile] Items spacing',
      default: '12px',
    },
    {
      type: 'select',
      id: 'items_alignment',
      label: 'Items alignment',
      options: [
        {
          value: 'flex-start',
          label: 'Left',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'flex-end',
          label: 'Right',
        },
      ],
    },
    {
      type: 'header',
      content: 'Text with icon',
    },
    {
      type: 'select',
      id: 'text_with_icon_title_position',
      label: 'Image position',
      options: [
        {
          value: 'column-reverse',
          label: 'Above text',
        },
        {
          value: 'column',
          label: 'Below text',
        },
        {
          value: 'row-reverse',
          label: 'Before text',
        },
        {
          value: 'row',
          label: 'After text',
        },
      ],
      default: 'column-reverse',
    },
    {
      type: 'select',
      id: 'text_with_icon_text_alignment',
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
      type: 'text',
      id: 'text_with_icon_items_spacing',
      label: 'Text / Image spacing',
      default: '10',
    },
    ...headings(),
    ...sectionLayout(),
    ...colors(),
  ],
  blocks: [
    {
      type: 'sub-collection',
      name: 'Sub-collection',
      settings: [
        {
          type: 'collection',
          id: 'collection',
          label: 'Collection',
        },
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
        },
        {
          type: 'text',
          id: 'title',
          label: 'Title',
        },
      ],
    },
    {
      type: 'text-with-icon',
      name: 'Text with icon',
      limit: 6,
      settings: [
        {
          type: 'select',
          id: 'icon',
          label: 'Icon',
          options: [
            {
              value: 'picto-coupon',
              label: 'Coupon',
              group: 'Shop',
            },
            {
              value: 'picto-gift',
              label: 'Gift',
              group: 'Shop',
            },
            {
              value: 'picto-taxes',
              label: 'Taxes',
              group: 'Shop',
            },
            {
              value: 'picto-warranty',
              label: 'Warranty',
              group: 'Shop',
            },
            {
              value: 'picto-like',
              label: 'Like',
              group: 'Shop',
            },
            {
              value: 'picto-store',
              label: 'Store',
              group: 'Shop',
            },
            {
              value: 'picto-store-pickup',
              label: 'Store pickup',
              group: 'Shop',
            },
            {
              value: 'picto-love',
              label: 'Love',
              group: 'Shop',
            },
            {
              value: 'picto-donation',
              label: 'Donation',
              group: 'Shop',
            },
            {
              value: 'picto-box',
              label: 'Box',
              group: 'Shipping',
            },
            {
              value: 'picto-address',
              label: 'Address',
              group: 'Shipping',
            },
            {
              value: 'picto-address-pin',
              label: 'Address pin',
              group: 'Shipping',
            },
            {
              value: 'picto-fast-delivery',
              label: 'Fast delivery',
              group: 'Shipping',
            },
            {
              value: 'picto-delivery-truck',
              label: 'Delivery truck',
              group: 'Shipping',
            },
            {
              value: 'picto-return-box',
              label: 'Returns',
              group: 'Shipping',
            },
            {
              value: 'picto-worldwide',
              label: 'World',
              group: 'Shipping',
            },
            {
              value: 'picto-plane',
              label: 'Plane',
              group: 'Shipping',
            },
            {
              value: 'picto-credit-card',
              label: 'Credit card',
              group: 'Payment & Security',
            },
            {
              value: 'picto-lock',
              label: 'Lock',
              group: 'Payment & Security',
            },
            {
              value: 'picto-shield',
              label: 'Shield',
              group: 'Payment & Security',
            },
            {
              value: 'picto-secure-payment',
              label: 'Secure payment',
              group: 'Payment & Security',
            },
            {
              value: 'picto-mobile',
              label: 'Mobile',
              group: 'Communication',
            },
            {
              value: 'picto-phone',
              label: 'Phone',
              group: 'Communication',
            },
            {
              value: 'picto-chat',
              label: 'Chat',
              group: 'Communication',
            },
            {
              value: 'picto-send',
              label: 'Send',
              group: 'Communication',
            },
            {
              value: 'picto-email',
              label: 'Email',
              group: 'Communication',
            },
            {
              value: 'picto-customer-support',
              label: 'Customer support',
              group: 'Communication',
            },
            {
              value: 'picto-operator',
              label: 'Support operator',
              group: 'Communication',
            },
            {
              value: 'picto-virus',
              label: 'Virus',
              group: 'Health',
            },
            {
              value: 'picto-mask',
              label: 'Mask',
              group: 'Health',
            },
          ],
          default: 'picto-customer-support',
        },
        {
          type: 'range',
          id: 'icon_width',
          min: 25,
          max: 80,
          step: 5,
          unit: 'px',
          label: 'Icon width',
          info: 'Only impact icons',
          default: 40,
        },
        {
          type: 'image_picker',
          id: 'custom_icon',
          label: 'Custom icon',
          info: '100 x 100px .png with transparency recommended',
        },
        {
          type: 'range',
          id: 'custom_icon_width',
          min: 40,
          max: 105,
          step: 5,
          unit: 'px',
          label: 'Custom icon width',
          info: 'Only impact custom icons',
          default: 50,
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Your title',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default: '<p>Short content about your store</p>',
        },
        {
          type: 'url',
          id: 'link',
          label: 'Item link',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'Sub-collection list',
    },
  ],
};
