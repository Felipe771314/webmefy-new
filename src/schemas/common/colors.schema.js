module.exports = () => [
  {
    type: 'header',
    content: 'Colors',
  },
  {
    type: 'color',
    id: 'background',
    label: 'Background',
    default: 'rgba(0,0,0,0)',
  },
  {
    type: 'color_background',
    id: 'background_gradiant',
    label: 'Background gradiant',
  },
  {
    type: 'image_picker',
    id: 'background_image',
    label: 'Background image',
  },
  {
    type: 'select',
    id: 'background_image_size',
    label: 'Background image size',
    options: [
      {
        value: 'none',
        label: 'None',
      },
      {
        value: 'repeat',
        label: 'Repeat',
      },
      {
        value: 'cover',
        label: 'Cover',
      },
    ],
    default: 'repeat',
  },
  {
    type: 'color',
    id: 'text_color',
    label: 'Text color',
    default: 'rgba(0,0,0,0)',
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
];
