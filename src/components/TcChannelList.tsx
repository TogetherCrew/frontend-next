import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TcButton from './TcButton';
import SvgIcon from './SvgIcon';
import { IGuildProps, ISubchannelProps } from '../utils/interfaces';
import TcCheckbox from './TcChecbox';

interface TcChannelListProps {
  channels: IGuildProps[];
  isLoading: boolean;
  handleSelectedChannels: (channels: IGuildProps[]) => void;
  refetchChannels: () => void;
}

function TcChannelList({
  channels,
  isLoading,
  handleSelectedChannels,
  refetchChannels,
}: TcChannelListProps) {
  const [activeChannels, setActiveChannels] = useState<IGuildProps[]>(channels);

  useEffect(() => {
    if (channels && channels.length > 0) {
      setActiveChannels(channels);
    }
  }, [channels]);

  useEffect(() => {
    handleSelectedChannels(activeChannels);
  }, [activeChannels, handleSelectedChannels]);

  const handleSelectAllChannelsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    guildId: string
  ) => {
    const isChecked = event.target.checked;

    const updatedChannels = channels.map((guild: IGuildProps) => {
      if (guild.id === guildId) {
        const updatedSubChannels = guild.subChannels.map(
          (channel: ISubchannelProps) => ({
            ...channel,
            isSelected: isChecked,
          })
        );

        return {
          ...guild,
          subChannels: updatedSubChannels,
        };
      }
      return guild;
    });
    setActiveChannels(updatedChannels);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    channelId: string
  ) => {
    const isChecked = event.target.checked;

    setActiveChannels((prevChannels) => {
      const updatedChannels = prevChannels.map((guild) => {
        const updatedSubChannels = guild.subChannels.map((channel) => {
          if (channel.id === channelId) {
            return {
              ...channel,
              isSelected: isChecked,
            };
          }
          return channel;
        });

        return {
          ...guild,
          subChannels: updatedSubChannels,
        };
      });

      return updatedChannels;
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          border: '1px solid #C6C6C6',
          padding: '1rem',
          borderRadius: '6px',
          overflow: 'hidden',
          height: '410px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        border: '1px solid #C6C6C6',
        padding: '1rem',
        borderRadius: '6px',
        overflow: 'hidden',
        height: '410px',
      }}
    >
      <TcButton
        label="Refresh List"
        color="secondary"
        sx={{
          paddingX: '1.4rem',
          position: 'relative',
          float: 'right',
        }}
        variant="outlined"
        startIcon={<SvgIcon iconName="icon-refresh" />}
        onClick={() => refetchChannels()}
      />
      {activeChannels &&
        activeChannels.map((guild: IGuildProps) => (
          <div
            key={guild.id}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="body1" color="black" fontWeight="semibold">
              {guild.title}
            </Typography>
            <div
              style={{
                paddingLeft: '1rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TcCheckbox
                sx={{ padding: '0' }}
                label="All Channels"
                checked={guild.subChannels.every(
                  (channel) => channel.isSelected
                )}
                onChange={(event) =>
                  handleSelectAllChannelsChange(event, guild.id)
                }
              />
              {guild.subChannels.map((channel: ISubchannelProps) => (
                <TcCheckbox
                  key={channel.id}
                  sx={{ padding: '0' }}
                  label={channel.name}
                  checked={channel.isSelected ?? false}
                  onChange={(event) => handleCheckboxChange(event, channel.id)}
                />
              ))}
            </div>
          </div>
        ))}
    </Box>
  );
}

export default TcChannelList;
