import { Story, Meta } from '@storybook/react';
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldProps,
} from '@mui/material';
import TcTextField from './TcTextField';

export default {
  title: 'Components/TcTextField',
  component: TcTextField,
} as Meta;

type Args = TextFieldProps & {
  label: string;
};

// eslint-disable-next-line react/function-component-definition
const Template: Story<Args> = (
  args: JSX.IntrinsicAttributes &
    (FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps)
) => <TcTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Email',
  variant: 'filled',
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  variant: 'outlined',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Password',
  variant: 'filled',
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  label: 'Phone Number',
  variant: 'outlined',
  error: true,
};
