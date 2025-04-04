module.exports = () => [
  {
    type: 'header',
    content: 'Advanced fixed position',
  },
  {
    type: 'paragraph',
    content:
      "Mind to use settings in this section only with 'Flex Grid' layout: Promotion blocks > ADVANCED LAYOUT > Section layout",
  },
  {
    type: 'checkbox',
    id: 'afp_primary_block',
    label: 'Primary block',
    info: 'Primary block holds 100% of the section width and may have a custom position as well',
    default: false,
  },
  {
    type: 'checkbox',
    id: 'afp_detached_block',
    label: 'Detached block',
    info: 'Detached block may have any XY position inside a section area. Default position is the left top corner.',
    default: false,
  },
  {
    type: 'number',
    id: 'afp_z_index',
    label: 'Z index',
    info: "Empty value is translated to 'auto'",
  },
  {
    type: 'text',
    id: 'afp_block_width',
    label: 'Block width',
    info: 'Units: px, %',
    default: '100%',
  },
  {
    type: 'paragraph',
    content:
      'Please note that for Primary blocks width + left shift + right shift should yeld 100%',
  },
  {
    type: 'text',
    id: 'afp_top',
    label: 'Top shift',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'text',
    id: 'afp_bottom',
    label: 'Bottom shift',
    info: 'Ex: 30px, 45%, 0',
    default: 'auto',
  },
  {
    type: 'text',
    id: 'afp_left',
    label: 'Left shift',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'text',
    id: 'afp_right',
    label: 'Right shift',
    info: 'Ex: 30px, 45%, 0',
    default: 'auto',
  },
  {
    type: 'text',
    id: 'afp_block_margin_top',
    label: 'Primary block top margin',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'text',
    id: 'afp_block_margin_bottom',
    label: 'Primary block bottom margin',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'checkbox',
    id: 'afp_reset_mobile',
    label: 'Disable fixed position on mobile',
    info: 'Resets desktop position changes for mobile devices',
    default: true,
  },
  {
    type: 'text',
    id: 'afp_mob_block_width',
    label: 'Block width (mobile)',
    info: 'Units: px, %',
    default: '100%',
  },
  {
    type: 'number',
    id: 'afp_mob_z_index',
    label: 'Z index (mobile)',
    info: "Empty value is translated to 'auto'",
  },
  {
    type: 'text',
    id: 'afp_mob_top',
    label: 'Top shift (mobile)',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'text',
    id: 'afp_mob_bottom',
    label: 'Bottom shift (mobile)',
    info: 'Ex: 30px, 45%, 0',
    default: 'auto',
  },
  {
    type: 'text',
    id: 'afp_mob_left',
    label: 'Left shift (mobile)',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'text',
    id: 'afp_mob_right',
    label: 'Right shift (mobile)',
    info: 'Ex: 30px, 45%, 0',
    default: 'auto',
  },
  {
    type: 'text',
    id: 'afp_mob_block_margin_top',
    label: 'Primary block top margin (mobile)',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
  {
    type: 'text',
    id: 'afp_mob_block_margin_bottom',
    label: 'Primary block bottom margin (mobile)',
    info: 'Ex: 30px, 45%, 0',
    default: '0',
  },
];
