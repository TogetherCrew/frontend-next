import { Grid, Typography } from '@mui/material';
import { theme } from '../../../constants/theme';
import TcButton from '../../TcButton';
import TcChecbox from '../../TcChecbox';
import { redirectToDiscord } from '../../../helper/redirectToDsicord';

interface IStepOneProps {
  isChecked: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StepOne({ isChecked, handleCheckboxChange }: IStepOneProps) {
  return (
    <Grid container>
      <Grid
        container
        my={5}
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
          {' '}
          <TcChecbox
            label={
              <Typography variant="button" sx={{ paddingTop: '1.5rem' }}>
                I understand and agree to the{' '}
                <b style={{ color: theme.palette.primary.main }}>
                  Privacy Policy and Terms of Service.
                </b>
              </Typography>
            }
            checked={isChecked}
            onChange={(e) => handleCheckboxChange(e)}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TcButton
            disabled={!isChecked}
            label="Connect your community"
            variant="contained"
            sx={{ height: '48px', width: '240px', marginTop: '2rem' }}
            onClick={() => {
              redirectToDiscord();
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepOne;
