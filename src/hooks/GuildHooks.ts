import { useQuery, UseQueryOptions } from 'react-query';
import GuildApi from '../api/GuildApi';

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
    }
  );
}
