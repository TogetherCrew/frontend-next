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
