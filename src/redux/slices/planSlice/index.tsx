import { createSlice } from '@reduxjs/toolkit';
import { staticVariables } from '../../../preferences/staticVariable';

let initialState: any = staticVariables.EMPTY_ARRAY;

export const planDetailSlice = createSlice({
  name: 'planDetails',
  initialState,

  reducers: {
    addPlanData: (state, action) => {
      const { planId, itemId } = action.payload;

      let isExists = state.filter(((item: any) => item.planId === planId))

      if (isExists.length <= 0) {
        return [
          ...state,
          {
            planId: planId,
            itemId: itemId
          }];
      }
    },

    removePlan: (state, action) => {
      // const { itemId } = action.payload;

      return state.filter((item: any) => item.itemId !== action.payload)

    }
  },
});

export const { addPlanData, removePlan } = planDetailSlice.actions;
export default planDetailSlice.reducer;
