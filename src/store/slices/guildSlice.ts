import { StateCreator } from 'zustand';
import { IGuildProps } from '../../utils/interfaces';

interface GuildState {
  channels: IGuildProps[];
  setChannels: (categories: IGuildProps[]) => void;
}

const createGuildSlice: StateCreator<GuildState> = (set) => ({
  channels: [],

  setChannels: (categories) => {
    const transformedCategories = categories.map((category) => ({
      ...category,
      subChannels: category.subChannels.map((subChannel) => ({
        ...subChannel,
        // Add new property here. For example:
        isSelected: true,
      })),
    }));

    set({ channels: transformedCategories });
  },
});

export default createGuildSlice;
