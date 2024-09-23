import { create } from "zustand";
import ExamDataType from "./types/ExamDataType";


type DataStore = {
  data?: ExamDataType;
  update: ( newData : any) => void;
}

export const UseMCQDataStore = create<DataStore>((set) => ({
  data: undefined,
  update: (newData: ExamDataType) => {
    set({data: newData});
  } 
}));