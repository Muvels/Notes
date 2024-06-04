import { initializeSubscriptions } from '@/lib/subscriptions';
import { create } from 'zustand';

type State = {
  token: string;
  setToken: (token: any) => void;
};


const useTokenStore = create<State>((set) => ({
  token: "",
  setToken: (token: any) => {
    set(token)
    initializeSubscriptions(token);
  }
}));

export default useTokenStore;
