import { create } from "zustand";
import ExamDataType from "./types/ExamDataType";
import examState from "./examState";


type DataStore = {
  state?: examState;
  update: ( newData : any) => void;
}

export const useExamStateStore = create<DataStore>((set) => ({
  state: examState.EDITING,
  update: (newData: examState) => {
    set({state: newData});
  } 
}));