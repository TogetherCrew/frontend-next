import { Grid, Typography } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import TcRangePicker from '../../TcRangePicker';
import TcSelectedChannels from '../../TcSelectedChannels';
import TcButton from '../../TcButton';
import TcTextField from '../../TcTextField';
import { dateRangeOptions } from '../../../lib/data/date';
import { DateService } from '../../../services/DateService';
import { IDateRange, IGuildProps } from '../../../utils/interfaces';
import { useUpdateGuild } from '../../../hooks/GuildHooks';
import { UserContext } from '../../../context/UserContext';
import { useUpdateEmail } from '../../../hooks/UserHooks';

interface IStepTwoProps {
  goNext: (step: number) => void;
}

function StepTwo({ goNext }: IStepTwoProps) {
  const { state } = useContext(UserContext);
  const { user } = state;
  const emailAddressRef = useRef<string>('');
  const [period, setPeriod] = useState<IDateRange>({
    startDate: DateService.subtractDays(DateService.getCurrentDate(), 7),
  });
  const [selectedChannels, setSelectedChannels] = useState<
    { channelId: string; channelName: string }[]
  >([]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    emailAddressRef.current = event.target.value;
  };

  const handlePeriodChange = (rangeValue: number) => {
    setPeriod({
      startDate: DateService.subtractDays(
        DateService.getCurrentDate(),
        rangeValue
      ),
    });
  };

  const handleSelectedChannels = (channels: IGuildProps[]) => {
    const selectedSubChannels = channels
      .flatMap((channel) => channel.subChannels)
      .filter((subChannel) => subChannel.isSelected)
      .map(({ name, id }) => ({ channelId: id, channelName: name }));

    setSelectedChannels(selectedSubChannels);
  };

  const { mutate: mutateGuild, isLoading: isLoadingGuild } = useUpdateGuild({
    guildId: user?.guild?.guildId || '',
  });

  const { mutate: mutateEmail, isLoading: isLoadingEmail } = useUpdateEmail();

  const handleContinueClick = async () => {
    const email = emailAddressRef.current;

    try {
      mutateGuild(
        { period: period.startDate, selectedChannels },
        {
          onSuccess: async () => {
            if (email && email !== '') {
              mutateEmail(
                { email },
                {
                  onSuccess: async () => {
                    goNext(2);
                  },
                }
              );
            } else {
              goNext(2);
            }
          },
        }
      );
    } catch (error) {
      // Handle error outside mutateGuild
      console.error('Failed to update guild or email:', error);
      // Perform any error handling or display error message
    }
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
        <TcSelectedChannels handleSelectedChannels={handleSelectedChannels} />
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
          isLoading={isLoadingGuild || isLoadingEmail}
          onClick={handleContinueClick}
        />
      </Grid>
    </Grid>
  );
}

export default StepTwo;
