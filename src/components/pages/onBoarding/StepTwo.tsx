import { Grid, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import TcRangePicker from '../../TcRangePicker';
import TcSelectedChannels from '../../TcSelectedChannels';
import TcButton from '../../TcButton';
import TcTextField from '../../TcTextField';
import { dateRangeOptions } from '../../../lib/data/date';
import { DateService } from '../../../services/DateService';
import { IDateRange } from '../../../utils/interfaces';

interface IStepTwoProps {
  goNext: (step: number) => void;
}

function StepTwo({ goNext }: IStepTwoProps) {
  const emailAddressRef = useRef<string>('');
  const [period, setPeriod] = useState<IDateRange>({
    startDate: DateService.subtractDays(DateService.getCurrentDate(), 7),
    endDate: DateService.getCurrentDate(),
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    emailAddressRef.current = event.target.value;
  };

  const handlePeriodChange = (rangeValue: number) => {
    setPeriod({
      startDate: DateService.subtractDays(
        DateService.getCurrentDate(),
        rangeValue
      ),
      endDate: DateService.getCurrentDate(),
    });
  };

  const handleContinueClick = () => {
    const emailAddress = emailAddressRef.current;
    // Use the emailAddress for further processing or pass it to the goNext function
    goNext(2);
  };

  return (
    <Grid container margin="0 auto" columnSpacing={8} rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="body1" color="black" fontWeight="bold">
          Choose date period for data analysis
        </Typography>
        <Typography variant="body1" color="black" mb="1rem">
          You will be able to change the date period and selected channels in
          the future.
        </Typography>
        <TcRangePicker
          options={dateRangeOptions}
          updatePeriodRange={handlePeriodChange}
        />
      </Grid>
      <Grid item xs={8} rowSpacing={4}>
        <Typography variant="body1" color="black" fontWeight="bold">
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
          InputProps={{ disableUnderline: true }}
          onChange={handleEmailChange}
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
          onClick={handleContinueClick}
        />
      </Grid>
    </Grid>
  );
}

export default StepTwo;
