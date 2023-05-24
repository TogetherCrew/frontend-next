import {
  AccordionDetails,
  AccordionSummary,
  DialogContent,
  DialogTitle,
  Link,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import TcButton from './TcButton';
import TcDialog from './TcDialog';
import SvgIcon from './SvgIcon';
import TcChannelList from './TcChannelList';
import TcAccardion from './TcAccardion';
import { UserContext } from '../context/UserContext';
import { useGuildChannels } from '../hooks/GuildHooks';
import { IGuildProps, ISubchannelProps } from '../utils/interfaces';

interface ITcSelectedChannelsProps {
  handleSelectedChannels: (channels: IGuildProps[]) => void;
}

function TcSelectedChannels({
  handleSelectedChannels,
}: ITcSelectedChannelsProps) {
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedChannels, setSelectedChannels] = useState<IGuildProps[]>([]);
  const { state } = useContext(UserContext);
  const { user } = state;
  const guildId = user?.guild?.guildId || '';

  const {
    data: channels,
    isLoading,
    refetch,
    isFetching,
  } = useGuildChannels({
    guildId,
    enabled: false,
  });

  function countSelectedSubChannels(channelsArray: IGuildProps[]) {
    let count = 0;

    if (channelsArray && Array.isArray(channelsArray)) {
      channelsArray.forEach((channel) => {
        if (channel.subChannels && Array.isArray(channel.subChannels)) {
          channel.subChannels.forEach((subChannel: ISubchannelProps) => {
            if (subChannel.isSelected === true) {
              count++;
            }
          });
        }
      });
    }

    return count;
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setSelectedChannels(channels);
  }, [channels]);

  useEffect(() => {
    if (selectedChannels) {
      handleSelectedChannels(selectedChannels);
    }
  }, [handleSelectedChannels, selectedChannels]);

  const openGuildModal = () => {
    setOpenDialog(true);
  };

  const updateSelectedChannles = (updatedGuilds: IGuildProps[]) => {
    setSelectedChannels(updatedGuilds);
  };
  const submitSelectedChannels = () => {
    handleSelectedChannels(selectedChannels);
    setOpenDialog(false);
  };
  const handleRefetchChannels = async () => {
    await refetch();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Typography variant="body1" color="black">
        Selected channels: {countSelectedSubChannels(selectedChannels)}
      </Typography>
      <TcButton
        label="Show channels"
        sx={{
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'underline', // Maintain underline on hover
          },
        }}
        onClick={() => openGuildModal()}
      />
      <TcDialog
        open={isOpenDialog}
        toggleDialog={(e) => setOpenDialog(e)}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center',
            verticalAlign: 'center',
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '650px',
              borderRadius: '10px',
              overflow: 'visible',
            },
            '& .MuiDialogContent-root': {
              overflow: 'auto',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.4rem 0',
          }}
          variant="h6"
        >
          Import activities from channels
          <SvgIcon
            iconName="icon-cross"
            wrapperStyle={{ cursor: 'pointer' }}
            onClick={() => setOpenDialog(false)}
          />
        </DialogTitle>
        <Typography variant="body2" color="black">
          Select channels to import activity in this workspace. Please give
          Together Crew access to all selected private channels by updating the
          channels permissions in Discord. Discord permission will affect the
          channels the bot can see.
        </Typography>
        <DialogContent sx={{ padding: '1rem 0' }}>
          <TcChannelList
            channels={selectedChannels}
            isLoading={isLoading || isFetching}
            handleSelectedChannels={updateSelectedChannles}
            refetchChannels={() => handleRefetchChannels()}
          />
          <TcAccardion
            disableGutters
            defaultExpanded
            elevation={0}
            sx={{
              boxShadow: 0,
              '&:.MuiPaper-root': {
                boxShadow: 'none !important',
              },
            }}
          >
            <AccordionSummary>
              {' '}
              <Typography variant="body1" color="black" fontWeight="semibold">
                How to give access to the channel you want to import?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol>
                <li>
                  <Typography variant="body2" color="black">
                    Navigate to the channel you want to import on{' '}
                    <Link
                      href="https://discord.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      sx={{
                        fontWeight: 'bold',
                        textDecoration: 'none',
                      }}
                    >
                      Discord
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="black">
                    Go to the settings for that specific channel (select the
                    wheel on the right of the channel name)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="black">
                    Select <b>Permissions</b> (left sidebar), and then in the
                    middle of the screen check <b>Advanced permissions</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="black">
                    With the <b>TogetherCrew Bot</b> selected, under Advanced
                    Permissions, make sure that [View channel] and [Read message
                    history] are marked as [✓]
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="black">
                    Select the plus sign to the right of Roles/Members and under
                    members select <b>TogetherCrew bot</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="black">
                    Click on the <b>Refresh List</b> button on this window and
                    select the new channels
                  </Typography>
                </li>
              </ol>
            </AccordionDetails>
          </TcAccardion>
        </DialogContent>
        <TcButton
          label="Save channels"
          variant="contained"
          sx={{
            height: '48px',
            width: '240px',
            display: 'flex',
            margin: '0 auto',
          }}
          onClick={() => submitSelectedChannels()}
        />
      </TcDialog>
    </div>
  );
}

export default TcSelectedChannels;
