import {createSlice, current} from '@reduxjs/toolkit';

let initialState: any = [];
export const questionsSlice = createSlice({
  name: 'questions',
  initialState,

  reducers: {
    addSurveyData: (state, action) => {
      state = action.payload;
    },
  },
});

export const {addSurveyData} = questionsSlice.actions;
export default questionsSlice.reducer;
