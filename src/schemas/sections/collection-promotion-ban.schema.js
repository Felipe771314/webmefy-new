const sectionLayout = require('../common/sectionLayout.schema');
const promotionBlock = require('../blocks/promotion-block-settings.schema');

module.exports = {
  name: 'Collection promotion ban',
  class: 'shopify-section--collection-promotion-ban',
  enabled_on: {
    templates: ['collection'],
  },
  settings: [
    {
      type: 'header',
      content: 'Breadcrumb',
    },
    {
      type: 'checkbox',
      id: 'show_breadcrumb',
      label: 'Show breadcrumb',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_breadcrumb_mobile',
      label: 'Show breadcrumb on mobile',
      default: false,
    },
    {
      type: 'select',
      id: 'breadcrumb_position',
      label: 'Breadcrumb position',
      options: [
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Inside Top',
          value: 'inside_top',
        },
        {
          label: 'Inside Bottom',
          value: 'inside_bottom',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
      ],
      default: 'top',
    },
    {
      type: 'select',
      id: 'breadcrumb_alignment',
      label: 'Breadcrumb alignment',
      options: [
        {
          label: 'Left',
          value: 'text--left',
        },
        {
          label: 'Center',
          value: 'text--center',
        },
        {
          label: 'Right',
          value: 'text--right',
        },
      ],
      default: 'text--left',
    },
    {
      type: 'checkbox',
      id: 'breadcrumb_show_home_link',
      label: 'Breadcrumb show home link',
      default: false,
    },
    {
      type: 'color',
      id: 'breadcrumb_color',
      label: 'Breadcrumb color',
    },
    {
      type: 'header',
      content: 'Sub-collection',
    },
    {
      type: 'checkbox',
      id: 'show_subcollections',
      label: 'Show sub-collections',
      info: "You must set a menu in 'settings > Breadcrumb'",
      default: true,
    },
    {
      type: 'checkbox',
      id: 'subcollections_hide_root_title',
      label: 'Hide sub-collection root title',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'subcollections_hide_title',
      label: 'Hide sub-collection title',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'show_subcollection_img',
      label: 'Show sub-collection images',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'mobile_hide_subcollection_img',
      label: 'Hide sub-collection images on mobile',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'subcollection_img_zoom',
      label: 'Disable image zoom',
      default: false,
    },
    {
      type: 'select',
      id: 'show_subcollection_title_position',
      label: 'Show sub-collection title position',
      options: [
        {
          label: 'Top',
          value: 'column',
        },
        {
          label: 'Bottom',
          value: 'column-reverse',
        },
      ],
      default: 'column',
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
      type: 'checkbox',
      id: 'subcollection_image_border',
      label: 'Image border color',
      default: false,
    },
    {
      type: 'color',
      id: 'subcollection_image_border_color',
      label: 'Sub-collection image border color',
      default: '#000',
    },
    {
      type: 'checkbox',
      id: 'subcollection_container_border',
      label: 'Container border',
      default: true,
    },
    {
      type: 'header',
      content: 'Collection description',
    },
    {
      type: 'checkbox',
      id: 'show_collection_description',
      label: 'Show collection description',
      default: true,
    },
    {
      type: 'select',
      id: 'truncate_collection_description',
      label: 'Truncate collection description',
      options: [
        {
          value: 'none',
          label: "Don't truncate",
        },
        {
          value: 'all',
          label: 'Truncate on all devices',
        },
        {
          value: 'tablet_mobile',
          label: 'Truncate only on tablet & mobile',
        },
        {
          value: 'mobile',
          label: 'Truncate only on mobile',
        },
      ],
      default: 'none',
    },
    {
      type: 'number',
      id: 'collection_description_max_length',
      label: 'Truncated collection description max length',
      default: 400,
    },
    ...sectionLayout(),
    ...promotionBlock(),
  ],
  presets: [
    {
      name: 'Collection promotion ban',
    },
  ],
};
