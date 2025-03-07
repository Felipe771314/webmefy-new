---
to: components/<%= name %>/<%= name %>.stories.tsx
---
import React from 'react';
import { Meta, Story } from '@storybook/react';
import <%= name %> from './<%= name %>';

export default {
  title: 'Components/<%= name %>',
  component: <%= name %>,
} as Meta;

const Template: Story = (args) => <<%= name %> {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Example Title',
};
