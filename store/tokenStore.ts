import { create } from 'zustand';

type State = {
  token: string;
  setToken: (token: any) => void;
};


const useTokenStore = create<State>((set) => ({
  token: "",
  setToken: (token: any) => set(token)
}));

export default useTokenStore;
