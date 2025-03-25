const registerBlocks = require('../blocks/register-blocks.schema');

module.exports = {
  name: 'Customer login',
  tag: 'section',
  class: 'shopify-section--main-customers-register',
  settings: [
    {
      type: 'header',
      content: 'Login',
    },
    {
      type: 'text',
      id: 'register_title',
      label: 'Register title',
      default: 'Register',
    },
    {
      type: 'select',
      id: 'register_title_text_transform',
      label: 'Register title text transform',
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
      ],
      default: 'uppercase',
    },
    {
      type: 'text',
      id: 'register_subtitle',
      label: 'Register subtitle',
      default: 'Please complete all fields:',
    },
    {
      type: 'checkbox',
      label: 'Show civility',
      id: 'civility_toggle',
      default: true,
    },
    {
      type: 'select',
      label: 'Default Civility',
      id: 'civility_default_value',
      options: [
        {
          value: '',
          label: '-None-',
        },
        {
          value: 'man',
          label: 'Mr',
        },
        {
          value: 'woman',
          label: 'Mme',
        },
      ],
      default: '',
    },
    {
      type: 'checkbox',
      label: 'Toggle civility required',
      id: 'civility_required',
      default: true,
    },
    {
      type: 'checkbox',
      label: 'First name validation',
      id: 'first_name_validation',
      default: true,
    },
    {
      type: 'text',
      label: 'First name validation pattern',
      id: 'first_name_validation_pattern',
      default:
        "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    },
    {
      type: 'checkbox',
      label: 'Last name validation',
      id: 'last_name_validation',
      default: true,
    },
    {
      type: 'text',
      label: 'Last name validation pattern',
      id: 'last_name_validation_pattern',
      default:
        "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    },
    {
      type: 'checkbox',
      label: 'Email confirmation',
      id: 'email_confirmation',
      default: false,
    },
    {
      type: 'text',
      label: 'Tag value separator',
      id: 'tag_value_separator',
      default: ':',
    },
    {
      type: 'checkbox',
      id: 'policy',
      label: 'Show policy',
      default: true,
    },
    {
      type: 'richtext',
      id: 'policy_text',
      label: 'Show policy',
      default: '<p>Here a texte about your website policy</p>',
    },
    {
      type: 'checkbox',
      label: 'Force CAPTCHA',
      id: 'force_register_form_captcha',
      default: true,
      info: 'Shopify will initialize captcha right after page load. No form interactions required.',
    },
    {
      type: 'header',
      content: 'Typography',
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
          value: 'span',
          label: 'SPAN',
        },
      ],
      default: 'h2',
    },
    {
      type: 'header',
      content: 'Buttons',
    },
    {
      type: 'select',
      id: 'link_style',
      label: 'Link style',
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
      type: 'header',
      content: 'Colors',
    },
    {
      type: 'color',
      id: 'text_color',
      label: 'Text color',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'button_background',
      label: 'Button background',
      default: 'rgba(0,0,0,0)',
    },
    {
      type: 'color',
      id: 'button_text_color',
      label: 'Button text',
      default: 'rgba(0,0,0,0)',
    },
  ],
  blocks: registerBlocks(),
};
