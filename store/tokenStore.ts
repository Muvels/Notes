import { getTokenCall } from '@/calls/DocumentCalls';
import { create } from 'zustand';

type State = {
  token: string;
  setToken: (token: string) => void;
};

const useTokenStore = create<State>((set) => ({
  token: "",
  setToken: (token: string) => {
    set({ token });
  }
}));

export default useTokenStore;
