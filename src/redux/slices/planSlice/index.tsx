import {createSlice} from '@reduxjs/toolkit';

let initialState: any = [];

export const planDetailSlice = createSlice({
  name: 'planDetails',
  initialState,

  reducers: {
    addPlanData: (state, action) => {
      const {planId, itemId} = action.payload;
      return {
        ...state,
        [planId]: itemId,
      };
    },
  },
});

export const {addPlanData} = planDetailSlice.actions;
export default planDetailSlice.reducer;
