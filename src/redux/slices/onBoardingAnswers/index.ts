import { createSlice } from "@reduxjs/toolkit";
import { staticVariables } from "../../../preferences/staticVariable";


let initialState:any = staticVariables.EMPTY_ARRAY


export const onBoardingSlice = createSlice({
    name: 'onBoarding',
    initialState,

    reducers: {
        addData: (state, action) => {
            const { qId,aId } = action.payload;
            return ({
                ...state,
                [qId]:aId
            });
        },
        fetchData : (state,action)=>{
            
        }
    }

})

export const { addData } = onBoardingSlice.actions;
export default onBoardingSlice.reducer;