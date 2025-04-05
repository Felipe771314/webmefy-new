module.exports = () => [
  {
    name: 'Phone',
    type: 'phone',
    settings: [
      {
        type: 'text',
        id: 'phone_title',
        label: 'Title',
      },
      {
        type: 'text',
        id: 'phone_subtitle',
        label: 'Subtitle',
      },
      {
        type: 'select',
        id: 'form_phone_display',
        label: 'Display',
        options: [
          {
            label: 'Prefix and number separated',
            value: 'form_phone_display_separated',
          },
          {
            label: 'Prefix and number in same input',
            value: 'form_phone_display_same_input',
          },
          {
            label: 'All elements on same line',
            value: 'form_phone_same_line',
          },
        ],
        default: 'form_phone_display_separated',
      },
      {
        type: 'checkbox',
        id: 'input_required',
        label: 'Input required',
        default: false,
      },
    ],
    limit: 1,
  },
  {
    name: 'Input field',
    type: 'input',
    settings: [
      {
        type: 'text',
        id: 'title',
        label: 'Input field',
      },
      {
        type: 'select',
        id: 'input_type',
        label: 'Input type',
        options: [
          {
            value: 'note',
            label: 'Note',
          },
          {
            value: 'tags',
            label: 'Tag',
          },
        ],
        default: 'tags',
      },
      {
        type: 'checkbox',
        id: 'input_required',
        label: 'Input required',
        default: false,
      },
      {
        type: 'header',
        content: 'Expert Mode',
      },
      {
        type: 'text',
        id: 'tag_name',
        label: 'Internal name',
        info: 'Use a value preceded by the underscore symbol to hide its display on the account page. Ex: _value',
      },
      {
        type: 'text',
        id: 'validation_pattern',
        label: 'Validation pattern',
        info: 'Use a regexp for a custom advanced validation',
      },
    ],
  },
  {
    type: 'dropdown',
    name: 'Dropdown',
    settings: [
      {
        type: 'text',
        id: 'title',
        label: 'Name',
        default: 'Dropdown',
      },
      {
        type: 'select',
        id: 'input_type',
        label: 'Input type',
        options: [
          {
            value: 'note',
            label: 'Note',
          },
          {
            value: 'tags',
            label: 'Tag',
          },
        ],
        default: 'tags',
      },
      {
        type: 'text',
        id: 'values',
        label: 'Values',
        info: "Separate each value by a comma. To submit with the form another value than the one displayed, add it after this separator '::' as following: displayed_value_1::submit_value_1, displayed_value_2::submit_value_2",
        default: 'value_1, value_2',
      },
      {
        type: 'checkbox',
        id: 'input_required',
        label: 'Input required',
        default: false,
      },
      {
        type: 'checkbox',
        id: 'label_outside',
        label: 'Show label outside input',
        default: false,
      },
      {
        type: 'header',
        content: 'Expert Mode',
      },
      {
        type: 'text',
        id: 'tag_value',
        label: 'internal name',
        info: 'Use a value preceded by the underscore symbol to hide its display on the account page. Ex: _value',
      },
      {
        type: 'text',
        id: 'custom_class',
        label: 'Input extra class css',
      },
    ],
  },
  {
    type: 'checkbox',
    name: 'Checkbox',
    settings: [
      {
        type: 'select',
        id: 'input_type',
        label: 'Input type',
        options: [
          {
            value: 'note',
            label: 'Note',
          },
          {
            value: 'tags',
            label: 'Tag',
          },
        ],
        default: 'tags',
      },
      {
        type: 'text',
        id: 'title',
        label: 'Name',
        default: 'Checkbox text',
      },
      {
        type: 'text',
        id: 'tag_value',
        label: 'Internal name',
      },
    ],
  },
  {
    type: 'newsletter',
    name: 'Newsletter',
    limit: 1,
    settings: [
      {
        type: 'text',
        id: 'title',
        label: 'Newsletter text',
        default: 'Subscribe to our newsletter',
      },
      {
        type: 'select',
        id: 'display_type',
        label: 'Display type',
        options: [
          {
            label: 'Checkbox',
            value: 'checkbox',
          },
          {
            label: 'Dropdown',
            value: 'dropdown',
          },
        ],
        default: 'checkbox',
      },
      {
        type: 'text',
        id: 'label_yes',
        label: "Label 'yes'",
        info: 'Used only for dropdown display',
        default: 'Oui',
      },
      {
        type: 'text',
        id: 'label_no',
        label: "Label 'no'",
        info: 'Used only for dropdown display',
        default: 'Non',
      },
    ],
  },
  {
    type: 'birthdate',
    name: 'Birth date',
    limit: 1,
    settings: [
      {
        type: 'text',
        id: 'title',
        label: 'Birth date text',
        default: 'Anniversaire',
      },
      {
        type: 'text',
        id: 'birthdate_subtitle',
        label: 'Subtitle',
      },
      {
        type: 'select',
        id: 'birth_select_style',
        label: 'Birth select style',
        options: [
          {
            label: 'Input',
            value: 'input',
          },
          {
            label: 'Dropdown',
            value: 'dropdown',
          },
          {
            label: 'Calendar',
            value: 'calendar',
          },
        ],
        default: 'input',
      },
      {
        type: 'text',
        id: 'year_birth_start',
        label: 'Birth year starts at...',
        default: '1920',
        info: "Setting only works when select style is set to 'Dropdown'",
      },
      {
        type: 'text',
        id: 'min_customer_age',
        label: 'Customer minimum age',
        info: "Setting only works when select style is set to 'Dropdown'",
      },
      {
        type: 'checkbox',
        id: 'input_required',
        label: 'Input required',
        default: false,
      },
      {
        type: 'checkbox',
        id: 'use_uniformized_tag_value_format',
        label: 'Use uniformized tag value format',
        info: "Value will be formatted to 'birthday:yyyy-mm-dd'",
        default: false,
      },
    ],
  },
  {
    type: 'hidden-language',
    name: 'Language (hidden)',
    limit: 1,
    settings: [
      {
        type: 'checkbox',
        id: 'use_language_code',
        label: 'Use ISO Format',
        default: false,
      },
      {
        type: 'select',
        id: 'input_type',
        label: 'Input type',
        options: [
          {
            value: 'note',
            label: 'Note',
          },
          {
            value: 'tags',
            label: 'Tag',
          },
        ],
        default: 'tags',
      },
      {
        type: 'header',
        content: 'Expert Mode',
      },
      {
        type: 'text',
        id: 'tag_name',
        label: 'Internal name',
        default: 'locale',
        info: 'Use a value preceded by the underscore symbol to hide its display on the account page. Ex: _value',
      },
    ],
  },
];
