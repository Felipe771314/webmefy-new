import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Text with icons',
  class: 'shopify-section--text-with-icons',
  disabled_on: {
    groups: ['header', 'custom.overlay'],
  },
  max_blocks: 4,
  settings: [
    ...headings(),
    ...sectionLayout(),
    {
      type: 'checkbox',
      id: 'stack_mobile',
      label: 'Stack on mobile',
      default: false,
    },
    {
      type: 'select',
      id: 'stack_mobile_columns',
      label: 'Number of columns on mobile',
      info: "Only works if 'stack on mobile' is checked",
      options: [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
      ],
      default: '2',
    },
    {
      type: 'select',
      id: 'item_alignment',
      label: 'Item alignment',
      options: [
        {
          value: 'column',
          label: 'Vertical',
        },
        {
          value: 'row',
          label: 'Horizontal',
        },
      ],
      default: 'column',
    },
    {
      type: 'select',
      id: 'image_alignment',
      label: 'Horizontal image alignment',
      info: 'Set the image position when the item is horizontal',
      options: [
        {
          value: 'flex-start',
          label: 'Top',
        },
        {
          value: 'center',
          label: 'Center',
        },
      ],
      default: 'center',
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
  ],
  blocks: [
    {
      type: 'item',
      name: 'Item',
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
          max: 200,
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
          info: 'Disabled if drawer is active',
        },
        {
          type: 'header',
          content: 'Drawer',
        },
        {
          type: 'checkbox',
          id: 'drawer_content_toggle',
          label: 'Toggle drawer',
          default: false,
        },
        {
          type: 'richtext',
          id: 'drawer_content',
          label: 'Drawer content',
          default: '<p>Here a detailed description</p>',
          info: 'Show detailed description in drawer',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'Text with icons',
      blocks: [
        {
          type: 'item',
          settings: {
            icon: 'picto-box',
            title: 'Free shipping',
            content:
              '<p>Free worldwide shipping and returns - customs and duties taxes included</p>',
          },
        },
        {
          type: 'item',
          settings: {
            icon: 'picto-phone',
            title: 'Customer service',
            content: '<p>We are available from monday to friday to answer your questions.</p>',
          },
        },
        {
          type: 'item',
          settings: {
            icon: 'picto-lock',
            title: 'Secure payment',
            content: '<p>Your payment information is processed securely.</p>',
          },
        },
        {
          type: 'item',
          settings: {
            icon: 'picto-email',
            title: 'Contact us',
            content: '<p>Need to contact us ? Just send us an e-mail at info@yourstore.com</p>',
          },
        },
      ],
    },
  ],
};
