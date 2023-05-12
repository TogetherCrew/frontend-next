import { create } from 'zustand';
import createAuthSlice from './slices/authSlice';

const useAppStore = create<any>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useAppStore;
