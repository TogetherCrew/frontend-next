import {
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material';

interface TcButtonProps extends ButtonProps {
  // add your custom props here
  label: string;
  isLoading?: boolean;
}

function TcButton(props: TcButtonProps) {
  const { label, isLoading, ...rest } = props;
  return (
    <Button {...rest}>
      {isLoading ? (
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress
            size={20}
            sx={{ color: 'white.main', marginRight: '6px' }}
          />{' '}
          Loading...
        </Typography>
      ) : (
        label
      )}
    </Button>
  );
}

TcButton.defaultProps = {
  isLoading: false,
};

export default TcButton;
