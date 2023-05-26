import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

interface TcCheckboxProps extends CheckboxProps {
  label: string | React.ReactNode;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TcCheckbox({ ...props }: TcCheckboxProps) {
  const { onChange, label, checked, disabled } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={onChange} disabled={disabled} />
      }
      label={label}
      sx={{
        '& .MuiTypography-root': {
          fontWeight: 'semibold',
        },
      }}
    />
  );
}

export default TcCheckbox;
