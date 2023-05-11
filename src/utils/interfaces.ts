export interface ISubchannelProps {
  canReadMessageHistoryAndViewChannel: boolean;
  id: string;
  name: string;
  parent_id: string;
}

export interface IGuildProps {
  id: string;
  subChannels: ISubchannelProps[];
  title: string;
}

export interface CallbackUrlParams {
  statusCode: string;
  accessToken: string;
  accessExp: string;
  refreshExp: string;
  refreshToken: string;
  guildId: string;
  guildName: string;
}

export interface UrlParams {
  [key: string]: string;
}
