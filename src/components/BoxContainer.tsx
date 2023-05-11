import { Box, BoxProps } from '@mui/material';

interface BoxContainerProps extends BoxProps {
  // any additional props you want to add
  width: string;
  height: string;
}

function BoxContainer({ children, ...rest }: BoxContainerProps) {
  return (
    <Box
      {...rest}
      sx={{
        boxShadow:
          '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(138, 138, 138, 0.16)',
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
}

export default BoxContainer;
