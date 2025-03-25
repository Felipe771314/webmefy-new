module.exports = () => [
  {
    type: 'header',
    content: 'Layout',
  },
  {
    type: 'select',
    id: 'section_width',
    label: 'Section width',
    options: [
      {
        value: 'fullwidth',
        label: 'Full width',
      },
      {
        value: 'fullwidth-gutter',
        label: 'Full width with gutter',
      },
      {
        value: 'boxed',
        label: 'Boxed',
      },
    ],
    default: 'boxed',
  },
  {
    type: 'checkbox',
    id: 'container_flush_mobile',
    label: 'Force fullwidth on mobile',
    default: false,
  },
  {
    type: 'select',
    id: 'container_size',
    label: 'Boxed size',
    info: "Only works for 'boxed'",
    options: [
      {
        value: '',
        label: 'Default',
      },
      {
        value: 'small',
        label: 'Small',
      },
      {
        value: 'medium',
        label: 'Medium',
      },
    ],
    default: '',
  },
  {
    type: 'text',
    id: 'custom_container_size',
    label: '[desktop] Custom boxed size',
    info: 'Override Container max-width for desktop',
  },
  {
    type: 'text',
    id: 'custom_container_size_mobile',
    label: '[mobile] Custom boxed size',
    info: 'Override Container max-width for mobile',
  },
  {
    type: 'select',
    id: 'section_vertical_margin',
    label: 'Section vertical margin',
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
        value: '',
        label: 'Normal',
      },
    ],
    default: '',
  },
  {
    type: 'text',
    id: 'custom_section_vertical_margin',
    label: '[desktop] Custom section vertical margin',
    info: 'Override CSS vertical margin for desktop (`both` or `top bottom`)',
  },
  {
    type: 'text',
    id: 'custom_section_vertical_margin_mobile',
    label: '[mobile] Custom section margin',
    info: 'Override CSS vertical margin for mobile (`both` or `top bottom`)',
  },
  {
    type: 'select',
    id: 'section_vertical_padding',
    label: 'Section internal vertical margin',
    options: [
      {
        value: '',
        label: 'None',
      },
      {
        value: 'vertical-breather--tight',
        label: 'Small',
      },
      {
        value: 'vertical-breather',
        label: 'Normal',
      },
    ],
    default: 'vertical-breather--tight',
  },
  {
    type: 'text',
    id: 'custom_section_vertical_padding',
    label: '[desktop] Custom section internal vertical margin',
    info: 'Override CSS vertical padding for desktop (`both` or `top bottom`)',
  },
  {
    type: 'text',
    id: 'custom_section_vertical_padding_mobile',
    label: '[mobile] Custom section vertical internal margin',
    info: 'Override CSS vertical padding for mobile (`both` or `top bottom`)',
  },
  {
    type: 'header',
    content: 'Advanced layout',
  },
  {
    type: 'checkbox',
    id: 'container_flush_left',
    label: 'Remove left gutter',
    default: false,
  },
  {
    type: 'checkbox',
    id: 'container_flush_right',
    label: 'Remove right gutter',
    default: false,
  },
];
