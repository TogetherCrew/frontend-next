import { TextField, TextFieldProps } from '@mui/material';
import { theme } from '../constants/theme';

type TextFieldProp = TextFieldProps;

function TcTextField({ ...props }: TextFieldProp) {
  return (
    <TextField
      {...props}
      InputLabelProps={{
        style: { color: theme.palette.grey[100] },
      }}
    />
  );
}

export default TcTextField;
