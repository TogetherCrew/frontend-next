import { Button, ButtonProps } from '@mui/material';

interface TcButtonProps extends ButtonProps {
  // add your custom props here
  label: string;
}

function TcButton(props: TcButtonProps) {
  const { label } = props;
  return <Button {...props}>{label}</Button>;
}

export default TcButton;
