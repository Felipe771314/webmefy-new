import heading from './heading.schema';

module.exports = () => [
  {
    type: 'header',
    content: 'Text',
  },
  ...heading({ prefix: 'subheading', label: 'Subheading' }),
  ...heading(),
  {
    type: 'header',
    content: 'Headings Layout',
  },
  {
    type: 'select',
    id: 'textblock_alignment',
    label: 'Text block alignment',
    options: [
      {
        value: 'section__header--left',
        label: 'Left',
      },
      {
        value: '',
        label: 'Center',
      },
      {
        value: 'section__header--right',
        label: 'Right',
      },
    ],
    default: '',
  },
  {
    type: 'select',
    id: 'mobile_textblock_alignment',
    label: '[mobile] Text block alignment',
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
];
