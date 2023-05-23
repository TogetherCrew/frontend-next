import { StateCreator } from 'zustand';
import { IGuildProps } from '../../utils/interfaces';

interface GuildState {
  channels: IGuildProps[];
  setChannels: (categories: IGuildProps[]) => void;
}

const createGuildSlice: StateCreator<GuildState> = (set) => ({
  channels: [],

  setChannels: (categories) => {
    set({ channels: categories });
  },
});

export default createGuildSlice;
