module.exports = {
  name: 'Spacer',
  class: 'shopify-section--spacer',
  settings: [
    {
      type: 'range',
      id: 'desktop_height',
      label: 'Desktop height',
      min: 20,
      max: 300,
      step: 10,
      unit: 'px',
      default: 20,
    },
    {
      type: 'range',
      id: 'mobile_height',
      label: 'Mobile height',
      min: 20,
      max: 300,
      step: 10,
      unit: 'px',
      default: 20,
    },
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
  ],
  presets: [
    {
      name: 'Spacer',
      settings: {},
    },
  ],
};
