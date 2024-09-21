import { create } from "zustand";

interface DataStore {
  data: any;
  update: ( newData : any) => void;
}

export const useMcqDataStore = create<DataStore>((set) => ({
  data: [],
  update: (newData: any) => {
    set({data: newData});
  } 
}));