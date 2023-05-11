import { Grid, Typography } from '@mui/material';
import TcRangePicker from '../../TcRangePicker';
import TcSelectedChannels from '../../TcSelectedChannels';
import TcButton from '../../TcButton';
import TcTextField from '../../TcTextField';

interface IStepTwoProps {
  goNext: (step: number) => void;
}

function StepTwo({ goNext }: IStepTwoProps) {
  const emailAddress = '';
  const options = [
    { value: 1, label: 'Last 7 days' },
    { value: 2, label: '1M' },
    { value: 3, label: '3M' },
    { value: 4, label: '6M' },
    { value: 5, label: '1Y' },
  ];

  return (
    <Grid container margin="0 auto" columnSpacing={8} rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="body1" color="initial" fontWeight="bold">
          Choose date period for data analysis
        </Typography>
        <Typography variant="body1" color="initial" mb="1rem">
          You will be able to change date period and selected channels in the
          future.
        </Typography>
        <TcRangePicker options={options} />
      </Grid>
      <Grid item xs={8} rowSpacing={4}>
        <Typography variant="body1" color="initial" fontWeight="bold">
          Confirm your imported channels
        </Typography>
        <TcSelectedChannels />
      </Grid>
      <Grid item xs={8} rowSpacing={4}>
        <TcTextField
          id="filled-basic"
          label="Email Address"
          variant="filled"
          autoComplete="off"
          value={emailAddress}
          InputProps={{ disableUnderline: true }}
          className="w-full md:w-2/5"
        />
      </Grid>
      <Grid item xs={10} rowSpacing={2}>
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
          onClick={() => goNext(2)}
        />
      </Grid>
    </Grid>
  );
}

export default StepTwo;
