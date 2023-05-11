/* eslint-disable react/function-component-definition */
import { Story, Meta } from '@storybook/react';
import TcStepper from './TcStepper';

export default {
  title: 'Components/TcStepper',
  component: TcStepper,
} as Meta;

const Template: Story<any> = (args) => <TcStepper {...args} />;

export const Default = Template.bind({});
Default.args = {
  labels: ['Step One', 'Step Two', 'Step Three'],
};
