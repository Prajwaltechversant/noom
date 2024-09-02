import {createSlice, current} from '@reduxjs/toolkit';
import { staticVariables } from '../../../preferences/staticVariable';

let initialState: any = staticVariables.EMPTY_ARRAY;
export const questionsSlice = createSlice({
  name: 'questions',
  initialState,

  reducers: {
    addSurveyData: (state, action) => {
      return(action.payload)
    },
  },
});

export const {addSurveyData} = questionsSlice.actions;
export default questionsSlice.reducer;
