module.exports = {
  name: 'Footer',
  class: 'shopify-section--footer',
  max_blocks: 6,
  settings: [
    {
      type: 'checkbox',
      id: 'menu_tab_toggle',
      label: 'Toggle menu tab',
      default: false,
    },
    {
      type: 'select',
      id: 'tabs_behaviour',
      label: 'Tabs behaviour',
      options: [
        {
          value: 'all_open',
          label: 'All tabs open',
        },
        {
          value: 'none_open',
          label: 'None tabs open',
        },
      ],
      default: 'none_open',
    },
    {
      type: 'checkbox',
      id: 'show_payment_icons',
      label: 'Show payment icons',
      default: true,
    },
    {
      type: 'header',
      content: 'Country/region selector',
      info: 'To add a country/region, go to your [currency settings.](/admin/settings/payments)',
    },
    {
      type: 'checkbox',
      id: 'show_country_selector',
      label: 'Show country/region selector',
      default: true,
    },
    {
      type: 'header',
      content: 'Language selector',
      info: 'To add a language, go to your [language settings.](/admin/settings/languages)',
    },
    {
      type: 'checkbox',
      id: 'show_locale_selector',
      label: 'Show language selector',
      default: true,
    },
    {
      type: 'richtext',
      id: 'legal_mentions',
      label: 'Legal mentions',
    },
  ],
  blocks: [
    {
      type: 'image',
      name: 'Image',
      settings: [
        {
          type: 'image_picker',
          id: 'image',
          label: 'Image',
          info: '300 x 300px .png recommended',
        },
        {
          type: 'range',
          id: 'image_width',
          min: 50,
          max: 300,
          step: 10,
          unit: 'px',
          label: 'Image width',
          default: 150,
        },
      ],
    },
    {
      type: 'text',
      name: 'Text',
      settings: [
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'About our store',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default:
            '<p>Use this text area to tell your customers about your brand and vision. You can change it in the theme editor.</p>',
        },
      ],
    },
    {
      type: 'cookies',
      name: 'Cookies',
      limit: 1,
      settings: [
        {
          type: 'text',
          id: 'cookie_label',
          label: 'Label',
          default: 'Manage cookies',
        },
      ],
    },
    {
      type: 'links',
      name: 'Links',
      settings: [
        {
          type: 'link_list',
          id: 'menu',
          label: 'Menu',
          info: "This menu won't show dropdown items.",
          default: 'footer',
        },
      ],
    },
    {
      type: 'social_media',
      name: 'Social media',
      limit: 1,
      settings: [
        {
          type: 'paragraph',
          content: 'To configure social media, go to your social media settings.',
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Follow us',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default:
            '<p>To configure social media, go to your social media settings. Change this text in the theme editor.</p>',
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
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Newsletter',
        },
        {
          type: 'richtext',
          id: 'content',
          label: 'Content',
          default: '<p>A short sentence describing what someone will receive by subscribing</p>',
        },
      ],
    },
  ],
  default: {
    blocks: [
      {
        type: 'text',
        settings: {},
      },
      {
        type: 'links',
        settings: {},
      },
      {
        type: 'newsletter',
        settings: {},
      },
      {
        type: 'social_media',
        settings: {},
      },
    ],
  },
};
