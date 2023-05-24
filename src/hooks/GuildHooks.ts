import {
  UseMutationOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import GuildApi from '../api/GuildApi';
import {
  IGuildPayloadOptions,
  IGuildProps,
  ISubchannelProps,
} from '../utils/interfaces';

interface GuildChannelsQueryProps extends UseQueryOptions {
  guildId: string;
  enabled?: boolean; // Enable initial fetch
}

interface UpdateGuildMutationProps
  extends UseMutationOptions<
    IGuildPayloadOptions,
    unknown,
    Partial<IGuildPayloadOptions>
  > {
  guildId: string;
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

export function useUpdateGuild(props: UpdateGuildMutationProps) {
  const { guildId, ...mutationOptions } = props;

  return useMutation(
    (updatedGuild: Partial<IGuildPayloadOptions>) =>
      GuildApi.updateGuild(guildId, updatedGuild),
    {
      ...mutationOptions,
    }
  );
}
