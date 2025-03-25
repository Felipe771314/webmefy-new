module.exports = ({ prefix = 'content', label = 'Content' } = {}) => {
  return [
    {
      type: 'header',
      content: label,
    },
    {
      type: 'richtext',
      id: prefix,
      label,
    },
    {
      type: 'checkbox',
      id: `${prefix}_enable_parsing_html`,
      label: `${label} enable parsing html`,
      info: 'Add possibility to use custom html markup',
      default: true,
    },
    {
      type: 'select',
      id: `${prefix}_font_size`,
      label: `${label} font size`,
      options: [
        {
          value: '',
          label: 'default',
        },
        {
          value: 'xxsmall',
          label: 'xxsmall',
        },
        {
          value: 'xsmall',
          label: 'xsmall',
        },
        {
          value: 'small',
          label: 'small',
        },
        {
          value: 'large',
          label: 'large',
        },
      ],
      default: '',
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
