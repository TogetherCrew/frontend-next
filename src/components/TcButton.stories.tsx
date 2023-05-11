/* eslint-disable react/function-component-definition */
import { Meta, Story } from '@storybook/react';

import TcButton from './TcButton';

export default {
  title: 'TcButton',
  component: TcButton,
} as Meta;

const Template: Story = (args) => <TcButton label="" {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Submit',
  color: 'secondary',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Submit',
  variant: 'outlined',
  color: 'secondary',
};

export const Custom = Template.bind({});
Custom.args = {
  label: 'Submit',
  variant: 'contained',
  color: 'secondary',
};
