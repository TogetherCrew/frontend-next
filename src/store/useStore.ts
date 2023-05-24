import { create } from 'zustand';
import createGuildSlice from './slices/guildSlice';

const useAppStore = create<any>()((...a) => ({
  ...createGuildSlice(...a),
}));

export default useAppStore;
