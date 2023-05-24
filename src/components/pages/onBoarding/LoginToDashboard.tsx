import { Container, Typography } from '@mui/material';
import BoxContainer from '../../BoxContainer';
import SvgIcon from '../../SvgIcon';
import { theme } from '../../../constants/theme';

function LoginToDashboard() {
  return (
    <BoxContainer
      width="700px"
      height="60px"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          textAlign: 'center',
          justifyContent: 'center',
          paddingTop: '1rem',
        }}
      >
        <SvgIcon iconName="icon-discord" wrapperStyle={{ height: '100%' }} />
        <Typography variant="body1" color="black" sx={{ marginLeft: '1rem' }}>
          Already connected?{' '}
          <b
            style={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
            }}
          >
            Log in
          </b>
        </Typography>
      </Container>
    </BoxContainer>
  );
}

export default LoginToDashboard;
