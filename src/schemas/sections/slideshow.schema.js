module.exports = {
  name: 'Slideshow',
  class: 'shopify-section--slideshow',
  disabled_on: {
    groups: ['header', 'custom.overlay', 'footer'],
  },
  max_blocks: 5,
  settings: [
    {
      type: 'select',
      id: 'section_height',
      label: 'Section height',
      options: [
        {
          value: 'auto',
          label: 'Original image ratio',
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
        {
          value: 'fit',
          label: 'Fit screen height',
        },
      ],
      info: 'Choose "Original image ratio" to not cut images. [Learn more](https://help.shopify.com/en/manual/online-store/images/theme-images#best-practices-for-slideshows-and-full-width-images)',
      default: 'auto',
    },
    {
      type: 'header',
      content: 'Navigation',
    },
    {
      type: 'checkbox',
      id: 'navigation_arrow',
      label: 'Show navigation arrows',
      default: true,
    },
    {
      type: 'select',
      id: 'navigation_type',
      label: 'Navigation type',
      options: [
        {
          value: 'progress_bar',
          label: 'Progress bar',
        },
        {
          value: 'square',
          label: 'Square',
        },
        {
          value: 'round',
          label: 'Round',
        },
      ],
      default: 'progress_bar',
    },
    {
      type: 'select',
      id: 'slideshow_nav_position',
      label: 'Slideshow nav position',
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
      type: 'select',
      id: 'transition_type',
      label: 'Transition type',
      options: [
        {
          value: 'sweep',
          label: 'Sweep',
        },
        {
          value: 'reveal',
          label: 'Reveal',
        },
        {
          value: 'fade',
          label: 'Fade',
        },
      ],
      default: 'sweep',
    },
    {
      type: 'checkbox',
      id: 'autoplay',
      label: 'Auto rotate between slides',
      default: true,
    },
    {
      type: 'range',
      id: 'cycle_speed',
      min: 4,
      max: 20,
      step: 1,
      unit: 'sec',
      label: 'Change slides every',
      default: 5,
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      type: 'select',
      id: 'block_space',
      label: 'Vertical block space',
      options: [
        {
          value: 'section--flush',
          label: 'None',
        },
        {
          value: 'section--tight',
          label: 'Small',
        },
        {
          value: 'section',
          label: 'Normal',
        },
      ],
      default: 'section',
    },
    {
      type: 'header',
      content: 'Colors',
    },
    {
      type: 'color',
      id: 'background',
      label: 'Background',
      info: 'Used while slideshow image is loading',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'arrow_color',
      label: 'Arrows color',
      default: '#FFFFFF',
    },
    {
      type: 'color',
      id: 'navigation_color',
      label: 'Navigation color',
      default: '#FFFFFF',
    },
  ],
  blocks: [
    {
      type: 'image',
      name: 'Image',
      settings: [
        {
          type: 'header',
          content: 'Display',
        },
        {
          type: 'select',
          id: 'visibility_target',
          label: 'Visibility target',
          options: [
            {
              value: 'vip',
              label: 'only show vip',
            },
            {
              value: 'non_vip',
              label: 'only non-vip',
            },
            {
              value: 'all',
              label: 'everyone',
            },
          ],
          default: 'all',
        },
        {
          type: 'image_picker',
          id: 'image',
          info: '2160 x 1080px .jpg recommended, 1080 x 1080px .jpg recommended if split',
          label: 'Image',
        },
        {
          type: 'image_picker',
          id: 'split_image',
          info: "1080 x 1080px .jpg recommended. Won't show up on mobile.",
          label: 'Split image',
        },
        {
          type: 'image_picker',
          id: 'mobile_image',
          label: 'Mobile image',
          info: '1000 x 1400px .jpg recommended. If none is set, desktop image will be used.',
        },
        {
          type: 'video',
          id: 'video',
          label: 'Video MP4',
        },
        {
          type: 'video',
          id: 'mobile_video',
          label: 'Mobile video MP4',
        },
        {
          type: 'header',
          content: 'Text',
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
          type: 'select',
          id: 'text_position_mobile',
          label: '[mobile] Text position',
          options: [
            {
              value: 'same_as_desktop',
              label: 'Same as desktop',
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
          default: 'same_as_desktop',
        },
        {
          type: 'header',
          content: 'Subheading',
        },
        {
          type: 'text',
          id: 'subheading',
          label: 'Subheading',
          default: 'Tell your story',
        },
        {
          type: 'select',
          id: 'subheading_tag',
          label: 'Subheading tag',
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
          default: 'h2',
        },
        {
          type: 'select',
          id: 'subheading_size',
          label: 'Subheading size',
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
              value: '',
              label: 'Default',
            },
          ],
          default: '',
        },
        {
          type: 'select',
          id: 'subheading_transform',
          label: 'Text transform',
          options: [
            {
              value: '',
              label: 'Default',
            },
            {
              value: 'uppercase',
              label: 'Uppercase',
            },
            {
              value: 'lowercase',
              label: 'Lowercase',
            },
            {
              value: 'capitalize',
              label: 'Capitalize',
            },
            {
              value: 'none',
              label: 'None',
            },
          ],
          default: '',
        },
        {
          type: 'select',
          id: 'subheading_weight',
          label: 'Font weight',
          options: [
            {
              value: 'default',
              label: 'Default',
            },
            {
              value: 'normal',
              label: 'Normal',
            },
            {
              value: 'bold',
              label: 'Bold',
            },
          ],
          default: 'default',
        },
        {
          type: 'header',
          content: 'Heading',
        },
        {
          type: 'text',
          id: 'title',
          label: 'Heading',
          default: 'Slide title',
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
              value: '',
              label: 'Default',
            },
          ],
          default: 'h3',
        },
        {
          type: 'select',
          id: 'heading_transform',
          label: 'Text transform',
          options: [
            {
              value: '',
              label: 'Default',
            },
            {
              value: 'uppercase',
              label: 'Uppercase',
            },
            {
              value: 'lowercase',
              label: 'Lowercase',
            },
            {
              value: 'capitalize',
              label: 'Capitalize',
            },
            {
              value: 'none',
              label: 'None',
            },
          ],
          default: '',
        },
        {
          type: 'select',
          id: 'heading_weight',
          label: 'Font weight',
          info: "Does not work if 'Heading' is set to 'Bold' in theme settings",
          options: [
            {
              value: 'default',
              label: 'Default',
            },
            {
              value: 'normal',
              label: 'Normal',
            },
            {
              value: 'bold',
              label: 'Bold',
            },
          ],
          default: 'default',
        },
        {
          type: 'header',
          content: 'Text',
        },
        {
          id: 'text',
          type: 'richtext',
          label: 'Text',
        },
        {
          type: 'header',
          content: 'Heading options',
        },
        {
          type: 'checkbox',
          id: 'text_shadow_toggle',
          label: 'Heading text shadow',
          default: false,
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
          type: 'header',
          content: 'Buttons',
        },
        {
          type: 'select',
          id: 'link_style_1',
          label: 'Button 1 link style',
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
          type: 'text',
          id: 'button_1_text',
          label: 'Button 1 text',
        },
        {
          type: 'url',
          id: 'button_1_link',
          label: 'Button 1 link',
          info: 'Leave the "Button 1 text", "Button 2" and "Button 3" settings empty to make the slide fully clickable.',
        },
        {
          type: 'checkbox',
          id: 'link_slide',
          label: 'Force link on slide',
          info: 'Leave the "Button 2 text" and "Button 3 text" settings empty to make the slide fully clickable.',
        },
        {
          type: 'select',
          id: 'link_style_2',
          label: 'Button 2 link style',
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
          type: 'text',
          id: 'button_2_text',
          label: 'Button 2 text',
        },
        {
          type: 'url',
          id: 'button_2_link',
          label: 'Button 2 link',
        },
        {
          type: 'select',
          id: 'link_style_3',
          label: 'Button 3 link style',
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
          type: 'text',
          id: 'button_3_text',
          label: 'Button 3 text',
        },
        {
          type: 'url',
          id: 'button_3_link',
          label: 'Button 3 link',
        },
        {
          type: 'header',
          content: 'Colors',
        },
        {
          type: 'color',
          id: 'text_color',
          label: 'Text',
          default: '#ffffff',
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
          id: 'button_1_background',
          label: 'Button 1 primary background',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'button_1_text_color',
          label: 'Button 1 primary text',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'button_2_background',
          label: 'Primary button 2 background',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'button_2_text_color',
          label: 'Primary button 2 text',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'button_3_background',
          label: 'Button 3 primary background',
          default: 'rgba(0,0,0,0)',
        },
        {
          type: 'color',
          id: 'button_3_text_color',
          label: 'Button 3 primary text',
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
      ],
    },
  ],
  presets: [
    {
      name: 'Slideshow',
      blocks: [
        {
          type: 'image',
          settings: {
            title: 'Slide 1',
          },
        },
        {
          type: 'image',
          settings: {
            title: 'Slide 2',
          },
        },
      ],
    },
  ],
};
