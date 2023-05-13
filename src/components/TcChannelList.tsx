import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import TcButton from './TcButton';
import SvgIcon from './SvgIcon';
import { IGuildProps, ISubchannelProps } from '../utils/interfaces';
import TcCheckbox from './TcChecbox';

const mockGuild: IGuildProps[] = [
  {
    id: '123',
    title: 'My Awesome Guild',
    subChannels: [
      {
        id: '4526',
        name: 'General',
        parent_id: '123',
        canReadMessageHistoryAndViewChannel: true,
      },
      {
        id: '789',
        name: 'Random',
        parent_id: '123',
        canReadMessageHistoryAndViewChannel: false,
      },
    ],
  },
  {
    id: '133',
    title: 'My Awesome Guild2',
    subChannels: [
      {
        id: '456',
        name: 'General1',
        parent_id: '123',
        canReadMessageHistoryAndViewChannel: true,
      },
      {
        id: '7892',
        name: 'Random2',
        parent_id: '123',
        canReadMessageHistoryAndViewChannel: false,
      },
    ],
  },
];

function TcChannelList() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectAllChannels, setSelectAllChannels] = useState(false);

  const handleSelectAllChannelsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectAllChannels(event.target.checked);
    if (event.target.checked) {
      const allChannelIds = mockGuild.flatMap((guild) =>
        guild.subChannels.map((channel) => channel.id)
      );
      setSelectedChannels(allChannelIds);
    } else {
      setSelectedChannels([]);
    }
  };

  const handleCheckboxChange = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      setSelectedChannels(selectedChannels.filter((id) => id !== channelId));
      setSelectAllChannels(false);
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
      if (
        selectedChannels.length + 1 ===
        mockGuild.flatMap((guild) => guild.subChannels).length
      ) {
        setSelectAllChannels(true);
      }
    }
  };

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
      />
      {mockGuild.map((guild) => (
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
              checked={selectAllChannels}
              onChange={handleSelectAllChannelsChange}
            />
            {guild.subChannels.map((channel: ISubchannelProps) => (
              <TcCheckbox
                key={channel.id}
                sx={{ padding: '0' }}
                label={channel.name}
                checked={selectedChannels.includes(channel.id)}
                onChange={() => handleCheckboxChange(channel.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </Box>
  );
}

export default TcChannelList;
