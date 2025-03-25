const heading = require('../common/heading.schema');
const richtextContent = require('../common/richtext-content.schema');

module.exports = () => [
  {
    type: 'header',
    content: 'Media',
  },
  {
    type: 'image_picker',
    id: 'image',
    label: 'Image',
    info: '1800 x 900px .jpg recommended',
  },
  {
    type: 'image_picker',
    id: 'mobile_image',
    label: 'Mobile image',
    info: '1000 x 1400px .jpg recommended. If none is set, desktop image will be used.',
  },
  {
    type: 'checkbox',
    id: 'image_lazy',
    label: 'Lazy loading image',
    info: "First images of page shouldn't be lazy loaded. [Learn more](https://web.dev/optimize-lcp/)",
    default: true,
  },
  {
    type: 'video',
    id: 'video',
    label: 'Video',
  },
  {
    type: 'video',
    id: 'mobile_video',
    label: 'Mobile video',
    info: 'If none is set, desktop image will be used.',
  },
  {
    type: 'video_url',
    id: 'video_url',
    accept: ['vimeo', 'youtube'],
    label: 'Video Youtube / Vimeo',
  },
  {
    type: 'checkbox',
    id: 'image_zoom_effect_disabled',
    label: 'Disable image zoom effect',
    default: false,
  },
  {
    type: 'header',
    content: 'Text',
  },
  ...heading({ prefix: 'subheading', label: 'Subheading' }),
  ...heading(),
  ...richtextContent(),
  {
    type: 'header',
    content: 'Button',
    info: "Please note that if the 'Text position outside' parameter is set to 'inside' and 'content' and/or 'Bottom content' contain links, the link will appear on the image but will not be clickable.",
  },
  {
    type: 'url',
    id: 'link',
    label: 'Link URL',
  },
  {
    type: 'checkbox',
    id: 'link_on_button',
    label: 'Add link only on button',
    info: 'If not set, link will on the entire block',
    default: false,
  },
  {
    type: 'text',
    id: 'button_text',
    label: 'Button text',
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
        value: 'ternary',
        label: 'Ternary button',
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
    id: 'button_size',
    label: 'Button size',
    options: [
      {
        value: 'small',
        label: 'Small',
      },
      {
        value: 'normal',
        label: 'Normal',
      },
      {
        value: 'fullwidth',
        label: 'Full width',
      },
      {
        value: 'fullwidth-phone',
        label: 'Full width on mobile',
      },
    ],
    default: 'normal',
  },
  {
    type: 'header',
    content: 'Button 2',
  },
  {
    type: 'url',
    id: 'link_2',
    label: 'Link 2 URL',
  },
  {
    type: 'text',
    id: 'button_2_text',
    label: 'Button 2 text',
  },
  {
    type: 'select',
    id: 'button_2_style',
    label: 'Button 2 style',
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
        value: 'ternary',
        label: 'Ternary button',
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
    id: 'button_2_size',
    label: 'Button 2 size',
    options: [
      {
        value: 'small',
        label: 'Small',
      },
      {
        value: 'normal',
        label: 'Normal',
      },
      {
        value: 'fullwidth',
        label: 'Full width',
      },
      {
        value: 'fullwidth-phone',
        label: 'Full width on mobile',
      },
    ],
    default: 'normal',
  },
  ...richtextContent({ prefix: 'bottom_content', label: 'Bottom content' }),
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
    type: 'checkbox',
    id: 'reverse_order_headings',
    label: 'Reverse order of headings',
    default: false,
  },
  {
    type: 'select',
    id: 'block_vertical_align',
    label: 'Block vertical alignment',
    options: [
      {
        value: 'normal',
        label: 'Normal',
      },
      {
        value: 'center',
        label: 'Center',
      },
    ],
    default: 'normal',
  },
  {
    type: 'select',
    id: 'block_internal_margin',
    label: 'Block internal margin',
    options: [
      {
        value: 'none',
        label: 'None',
      },
      {
        value: 'small',
        label: 'Small',
      },
      {
        value: 'large',
        label: 'Large',
      },
      {
        value: 'xlarge',
        label: 'XLarge',
      },
      {
        value: 'xxlarge',
        label: 'XXLarge',
      },
    ],
    default: 'none',
  },
  {
    type: 'text',
    id: 'block_internal_margin_custom_desktop',
    label: '[Desktop] Block internal margin',
    info: 'If set overrides desktop margin',
  },
  {
    type: 'text',
    id: 'block_internal_margin_custom_mobile',
    label: '[Mobile] Block internal margin',
    info: 'If set overrides mobile margin',
  },
  {
    type: 'select',
    id: 'internal_margin',
    label: 'Text container margin',
    options: [
      {
        value: 'default',
        label: 'Default',
      },
      {
        value: 'none',
        label: 'None',
      },
      {
        value: 'small',
        label: 'Small',
      },
      {
        value: 'large',
        label: 'Large',
      },
    ],
    default: 'default',
  },
  {
    type: 'text',
    id: 'internal_margin_custom_desktop',
    label: '[Desktop] Text container margin',
    info: 'If set overrides desktop text container margin',
  },
  {
    type: 'text',
    id: 'internal_margin_custom_mobile',
    label: '[Mobile] Text container margin',
    info: 'If set overrides mobile text container margin',
  },
  {
    type: 'select',
    id: 'text_position',
    label: 'Text position',
    options: [
      {
        value: 'top_stretch',
        label: 'Top',
      },
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
        value: 'middle_stretch',
        label: 'Middle',
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
        value: 'bottom_stretch',
        label: 'Bottom',
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
    type: 'select',
    id: 'text_align',
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
    id: 'text_position_outside',
    label: 'Text position outside',
    options: [
      {
        value: 'inside',
        label: 'Inside',
      },
      {
        value: 'outside_left',
        label: 'Outside left',
      },
      {
        value: 'outside_right',
        label: 'Outside right',
      },
      {
        value: 'outside_bottom',
        label: 'Outside bottom',
      },
    ],
    default: 'inside',
  },
  {
    type: 'text',
    id: 'text_container_max_width',
    label: 'Text container max width',
  },
  {
    type: 'header',
    content: '[Mobile] Layout',
    info: 'override settings only for mobile',
  },
  {
    type: 'checkbox',
    id: 'hide_mobile',
    label: 'Hide on mobile',
    default: false,
  },
  {
    type: 'checkbox',
    id: 'hide_tablet',
    label: 'Hide on tablet',
    default: false,
  },
  {
    type: 'select',
    id: 'mobile_text_position',
    label: '[Mobile] Text position',
    options: [
      {
        value: '',
        label: 'Same as desktop',
      },
      {
        value: 'top_stretch',
        label: 'Top',
      },
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
        value: 'middle_stretch',
        label: 'Middle',
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
        value: 'bottom_stretch',
        label: 'Bottom',
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
    default: '',
  },
  {
    type: 'select',
    id: 'mobile_text_align',
    label: '[Mobile] Text alignment',
    options: [
      {
        value: '',
        label: 'Same as desktop',
      },
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
    default: '',
  },
  {
    type: 'text',
    id: 'mobile_text_container_max_width',
    label: '[Mobile] Text container max width',
  },
  {
    type: 'header',
    content: 'Advanced outside layout',
    info: "Works only with text position 'outside'",
  },
  {
    type: 'select',
    id: 'outside_layout',
    label: 'Outside layout',
    options: [
      {
        value: '1/2-1/2',
        label: '1/2 - 1/2',
      },
      {
        value: '1/3-2/3',
        label: '1/3 - 2/3',
      },
      {
        value: '2/3-1/3',
        label: '2/3 - 1/3',
      },
    ],
    default: '1/2-1/2',
  },
  {
    type: 'checkbox',
    id: 'outside_legend',
    label: 'Show headings as media legend',
    info: "Only with 'outside' layout",
    default: false,
  },
  {
    type: 'checkbox',
    id: 'outside_stack_on_mobile',
    label: 'Outside stack on mobile',
    default: true,
  },
  {
    type: 'checkbox',
    id: 'reverse_outside_stack_on_mobile',
    label: 'Reverse outside stack on mobile',
    default: false,
  },
  {
    type: 'range',
    id: 'media_vertical_shift',
    label: 'Media vertical shift',
    min: -100,
    max: 100,
    step: 5,
    unit: 'px',
    default: 0,
  },
  {
    type: 'range',
    id: 'media_vertical_shift_mobile',
    label: 'Media vertical shift mobile',
    min: -50,
    max: 50,
    step: 1,
    unit: 'px',
    default: 0,
  },
  {
    type: 'header',
    content: 'Advanced grid layout',
    info: "Only works with 'grid layout' on the section",
  },
  {
    type: 'range',
    id: 'col_size',
    label: '[desktop] Block col size (width)',
    min: 1,
    max: 12,
    step: 1,
    default: 1,
  },
  {
    type: 'range',
    id: 'row_size',
    label: '[desktop] Block row size (height)',
    min: 1,
    max: 10,
    step: 1,
    default: 1,
  },
  {
    type: 'paragraph',
    content: '_______________________________________',
  },
  {
    type: 'range',
    id: 'col_size_mobile',
    label: '[mobile] Block col size (width)',
    min: 1,
    max: 6,
    step: 1,
    default: 1,
  },
  {
    type: 'range',
    id: 'row_size_mobile',
    label: '[mobile] Block row size (height)',
    min: 1,
    max: 5,
    step: 1,
    default: 1,
  },
  {
    type: 'header',
    content: 'Advanced media settings',
  },
  {
    type: 'checkbox',
    id: 'image_natural_size',
    label: 'Image natural size',
    info: "Only works with 'outside' position",
    default: false,
  },
  {
    type: 'text',
    id: 'aspect_ratio',
    label: 'Aspect ratio',
    info: 'If set, override image or video aspect ratio',
  },
  {
    type: 'text',
    id: 'mobile_aspect_ratio',
    label: 'Mobile aspect ratio',
    info: 'If set, override image or video aspect ratio',
  },
  {
    type: 'select',
    id: 'media_position',
    label: 'Media position',
    info: "Doesn't work with Youtube or Vimeo videos",
    options: [
      {
        value: 'center',
        label: 'Center',
      },
      {
        value: 'left',
        label: 'Left',
      },
      {
        value: 'right',
        label: 'Right',
      },
      {
        value: 'top',
        label: 'Top',
      },
      {
        value: 'bottom',
        label: 'Bottom',
      },
    ],
    default: 'center',
  },
  {
    type: 'text',
    id: 'media_sizes_desktop',
    label: '[desktop] Media sizes',
    info: 'Override default desktop media sizes',
  },
  {
    type: 'text',
    id: 'media_sizes_mobile',
    label: '[mobile] Media sizes',
    info: 'Override default mobile media sizes',
  },
  {
    type: 'header',
    content: 'Colors',
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
    id: 'title_color',
    label: 'Heading color',
  },
  {
    type: 'color',
    id: 'subheading_color',
    label: 'Subheading color',
  },
  {
    type: 'color',
    id: 'button_background',
    label: 'Button background',
    default: 'rgba(0,0,0,0)',
  },
  {
    type: 'color',
    id: 'button_text_color',
    label: 'Button text color',
    default: 'rgba(0,0,0,0)',
  },
  {
    type: 'color',
    id: 'button_2_background',
    label: 'Button 2 background',
    default: 'rgba(0,0,0,0)',
  },
  {
    type: 'color',
    id: 'button_2_text_color',
    label: 'Button 2 text color',
    default: 'rgba(0,0,0,0)',
  },
  {
    type: 'color',
    id: 'overlay_color',
    label: 'Overlay',
    default: '#000000',
  },
  {
    type: 'range',
    id: 'overlay_opacity',
    label: 'Overlay opacity',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    default: 30,
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
];
