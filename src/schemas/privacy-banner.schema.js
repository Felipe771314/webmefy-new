module.exports = {
  name: 'Privacy banner',
  class: 'shopify-section--privacy-banner',
  enabled_on: {
    groups: ['custom.overlay'],
  },
  limit: 1,
  settings: [
    {
      type: 'paragraph',
      content:
        'Privacy bar will only be visible if it fulfills the conditions of the [Shopify Customer Privacy API](https://shopify.dev/docs/themes/consent-tracking-api)',
    },
    {
      type: 'text',
      id: 'cookie_bar_title',
      label: 'Title',
      default: 'Cookie policy',
    },
    {
      type: 'richtext',
      id: 'cookie_bar_content',
      label: 'Content',
      default:
        '<p>I agree to the processing of my data in accordance with the conditions set out in the policy of Privacy.</p>',
    },
  ],
  presets: [
    {
      name: 'Privacy banner',
    },
  ],
};
