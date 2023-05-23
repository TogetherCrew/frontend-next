import { useQuery, UseQueryOptions } from 'react-query';
import GuildApi from '../api/GuildApi';
import { IGuildProps, ISubchannelProps } from '../utils/interfaces';

interface GuildChannelsQueryProps extends UseQueryOptions {
  guildId: string;
  enabled?: boolean; // Enable initial fetch
}

export function useGuildChannels(props: GuildChannelsQueryProps) {
  const { guildId, enabled } = props;

  return useQuery(
    'guildChannels',
    () => GuildApi.getGuildChannelsById(guildId),
    {
      enabled,
      select: (guild) => {
        const transformedGuildResponse = guild.map((channels: IGuildProps) => ({
          ...channels,
          subChannels: channels.subChannels.map(
            (subChannel: ISubchannelProps) => ({
              ...subChannel,
              isSelected: true,
            })
          ),
        }));
        return transformedGuildResponse;
      },
    }
  );
}
