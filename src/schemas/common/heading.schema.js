module.exports = ({ prefix = 'heading', label = 'Heading' } = {}) => {
  return [
    {
      type: 'header',
      content: label,
    },
    {
      type: 'text',
      id: prefix === 'heading' ? 'title' : prefix,
      label,
      default: `Your ${label.toLowerCase()}`,
    },
    {
      type: 'select',
      id: `${prefix}_tag`,
      label: `${label} tag (SEO)`,
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
      id: `${prefix}_size`,
      label: `${label} size`,
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
        ...(prefix === 'subheading'
          ? [
              {
                value: 'default',
                label: 'Default',
              },
            ]
          : []),
      ],
      default: 'h2',
    },
    {
      type: 'text',
      id: `${prefix}_custom_font_size`,
      label: `[desktop] ${label} custom font size`,
      info: 'Override CSS font-size for desktop',
    },
    {
      type: 'text',
      id: `${prefix}_custom_font_size_mobile`,
      label: `[mobile] ${label} custom font size`,
      info: 'Override CSS font-size for mobile',
    },
    {
      type: 'select',
      id: `${prefix}_transform`,
      label: `${label} text transform`,
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
      id: `${prefix}_weight`,
      label: `${label} font weight`,
      info: `May not work, depends on the typography`,
      options: [
        {
          value: 'default',
          label: 'Default',
        },
        {
          value: 'light',
          label: 'Light',
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
      type: 'select',
      id: `${prefix}_typo`,
      label: `${label} typography`,
      options: [
        {
          value: 'default',
          label: 'Default',
        },
        {
          value: 'primary',
          label: 'Heading primary',
        },
        {
          value: 'secondary',
          label: 'Heading secondary',
        },
        {
          value: 'body-text',
          label: 'Body text',
        },
      ],
      default: 'default',
    },
  ];
};
