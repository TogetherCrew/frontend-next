import { DisconnectType } from './enums';

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

export interface IGuildQueryOptions {
  isInProgress?: boolean;
  isDisconnected?: boolean;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface IChannel {
  channelId: string;
  channelName: string;
}

export interface IGuild {
  period?: string;
  selectedChannels?: IChannel[];
}

export interface IDisconnectTypeValue {
  disconnectType: DisconnectType.Soft | DisconnectType.Hard;
}

export interface IAuthToken {
  id: string;
  token: string;
  user: string;
  type: string;
  expires: string;
  blacklisted: boolean;
}

export interface IAuthTokens {
  access: IAuthToken;
  refresh: IAuthToken;
}

export interface IGraphPeriodPayload {
  startDate: string;
  endDate: string;
}

export interface IHeatmapChartPayload extends IGraphPeriodPayload {
  timeZone: string;
  channelIds: string[];
}
