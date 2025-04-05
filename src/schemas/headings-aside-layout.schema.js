module.exports = () => {
  return [
    {
      type: 'header',
      content: '[Desktop] Headings Aside Layout',
      info: 'Only for desktop',
    },
    {
      type: 'select',
      id: 'header_position',
      label: 'Headings position',
      options: [
        {
          value: 'top',
          label: 'Top',
        },
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'right',
          label: 'Right',
        },
      ],
      default: 'top',
    },
    {
      type: 'select',
      id: 'header_vertical_align',
      label: 'Headings aside vertical align',
      options: [
        {
          value: 'start',
          label: 'Top',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'end',
          label: 'Bottom',
        },
      ],
      default: 'center',
    },
    {
      type: 'range',
      id: 'header_width',
      label: 'Headings aside width',
      min: 0,
      max: 100,
      unit: '%',
      default: 25,
    },
    {
      type: 'range',
      id: 'header_margin',
      label: 'Headings aside margin',
      min: 0,
      max: 100,
      unit: 'px',
      default: 40,
    },
  ];
};
