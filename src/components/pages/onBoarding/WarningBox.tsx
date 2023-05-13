import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SvgIcon from '../../SvgIcon';
import TcButton from '../../TcButton';
import { CallbackUrlParams } from '../../../utils/interfaces';
import useStatusCodeService from '../../../services/StatusCodeService';

interface IWarningBoxProps {
  urlParams: CallbackUrlParams;
}

function WarningBox({ urlParams }: IWarningBoxProps) {
  const navigate = useNavigate();
  const { writeUserToLocalStorage } = useStatusCodeService();

  const redirectToApp = () => {
    writeUserToLocalStorage(urlParams);
    navigate('/settings');
  };

  return (
    <Grid container>
      <Grid
        container
        py={6}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          direction="row"
          xs={6}
          justifyContent="center"
          alignItems="center"
        >
          <SvgIcon
            iconName="icon-error"
            wrapperStyle={{
              width: '48px',
              height: '48px',
              transform: 'scale(1.5)',
            }}
          />{' '}
          <Typography
            variant="h6"
            mx={6}
            color="black"
            fontWeight="bold"
            textAlign="center"
          >
            Please, disconnect your community first
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          xs={8}
          my={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography mb={3} variant="body2" color="black" textAlign="center">
            There is one Discord community under your email already. If you want
            to add a new community, please disconnect the current community
            first. Go to the <b>Settings</b> section and choose{' '}
            <b>Disconnect</b> option.
          </Typography>
          <TcButton
            label="Log in"
            variant="contained"
            sx={{
              height: '48px',
              width: '240px',
              display: 'flex',
              margin: '0 auto',
            }}
            onClick={() => redirectToApp()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WarningBox;
