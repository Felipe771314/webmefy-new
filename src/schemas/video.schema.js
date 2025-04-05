import headings from '../common/headings.schema';
import colors from '../common/colors.schema';
import sectionLayout from '../common/sectionLayout.schema';

module.exports = {
  name: 'Video',
  class: 'shopify-section--video',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  settings: [
    ...headings(),
    {
      type: 'checkbox',
      id: 'text_shadow_toggle',
      label: 'Heading text shadow',
      default: false,
      info: "Only works when 'Video Mode' is 'Full width'",
    },
    {
      type: 'color',
      id: 'text_shadow_color',
      label: 'Text shadow color',
      default: '#000000',
    },
    {
      type: 'range',
      id: 'text_shadow_color_opacity',
      label: 'Text shadow opacity',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      default: 100,
    },
    {
      type: 'text',
      id: 'button_text',
      label: 'Button text',
    },
    {
      type: 'url',
      id: 'button_link',
      label: 'Button link',
    },
    {
      type: 'select',
      id: 'button_style',
      label: 'Button style',
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
      type: 'select',
      id: 'text_position',
      label: 'Text position',
      info: "Only works when 'Video Mode' is 'Full width'",
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
      type: 'header',
      content: 'Video',
    },
    {
      type: 'video',
      id: 'video',
      label: 'Video',
      info: 'Replaces the external video if both are set.',
    },
    {
      type: 'video_url',
      id: 'video_url',
      accept: ['vimeo', 'youtube'],
      label: 'External video',
      default: 'https://www.youtube.com/watch?v=_9VUPq3SxOc',
    },
    {
      type: 'image_picker',
      id: 'image',
      label: 'Cover image',
      info: '2000 x 1125px .jpg recommended. Required if you turn off autoplay.',
    },
    ...sectionLayout(),
    {
      type: 'select',
      id: 'background_type',
      label: 'Video mode',
      options: [
        {
          value: 'full_width',
          label: 'Full width',
        },
        {
          value: 'boxed',
          label: 'Boxed',
        },
      ],
      default: 'full_width',
    },
    {
      type: 'select',
      id: 'video_size',
      label: 'Video size',
      options: [
        {
          value: 'auto',
          label: 'Original ratio',
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
      default: 'auto',
    },
    {
      type: 'checkbox',
      id: 'autoplay',
      label: 'Autoplay',
      info: 'Video is muted automatically to allow autoplay.',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'show_video_controls',
      label: 'Show video controls',
      default: false,
    },
    {
      type: 'header',
      content: 'Advanced',
    },
    {
      type: 'text',
      id: 'extra_css_class',
      label: 'Extra CSS class',
    },
    ...colors(),
    {
      type: 'color',
      id: 'button_background',
      label: 'Button background',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'button_text_color',
      label: 'Button text',
      default: 'rgba(0,0,0,0)',
    },
  ],
  presets: [
    {
      name: 'Video',
    },
  ],
};
