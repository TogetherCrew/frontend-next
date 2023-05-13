/* eslint-disable react/no-unescaped-entities */
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import TcButton from '../../TcButton';
import { theme } from '../../../constants/theme';

interface IStepThreeProps {
  goNext: (step: number) => void;
}

function StepThree({ goNext }: IStepThreeProps) {
  return (
    <Grid container>
      <Grid
        container
        my={8}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Typography
            variant="h5"
            color="black"
            fontWeight="bold"
            textAlign="center"
            my={3}
          >
            Perfect, you're all set!
          </Typography>
          <Typography variant="body1" color="black" textAlign="center">
            Data import just started. It might take up to 12 hours to finish.
            Once it is done we will send you a <b>message on Discord.</b>
          </Typography>
          <TcButton
            label="Continue"
            variant="contained"
            sx={{
              height: '48px',
              width: '240px',
              display: 'flex',
              margin: '0 auto',
              marginTop: '2rem',
            }}
            onClick={() => goNext(3)}
          />
        </Grid>
        <Grid item xs={9} mt={4}>
          <Typography variant="body1" color="black">
            While you are waiting, read our research about{' '}
            <b style={{ color: theme.palette.primary.main }}>
              Community Health.
            </b>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepThree;
