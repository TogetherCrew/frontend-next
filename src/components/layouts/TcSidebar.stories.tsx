/* eslint-disable react/function-component-definition */
import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import TcSidebar from './TcSidebar';

export default {
  component: TcSidebar,
  title: 'Components/TcSidebar',
} as Meta;

const Template: Story = () => (
  <MemoryRouter>
    <TcSidebar />
  </MemoryRouter>
);

export const Default = Template.bind({});
