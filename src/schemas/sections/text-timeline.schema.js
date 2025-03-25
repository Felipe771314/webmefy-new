const headings = require('../common/headings.schema');
const colors = require('../common/colors.schema');
const sectionLayout = require('../common/sectionLayout.schema');

module.exports = {
  name: 'Text timeline',
  settings: [
    ...headings(),
    ...sectionLayout(),
    ...colors(),
    {
      type: 'color',
      id: 'line_color',
      label: 'Line color',
      default: '#979797',
    },
  ],
  blocks: [
    {
      type: 'timeline_item',
      name: 'Timeline item',
      limit: 50,
      settings: [
        {
          id: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          id: 'text',
          type: 'textarea',
          label: 'Text',
        },
        {
          id: 'title_color',
          type: 'color',
          label: 'Title color',
          default: 'rgba(0,0,0,0)',
        },
      ],
    },
  ],
  presets: [
    {
      name: 'Text timelime',
      settings: {},
    },
  ],
};
