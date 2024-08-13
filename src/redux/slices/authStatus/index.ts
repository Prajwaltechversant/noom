import { createSlice } from "@reduxjs/toolkit";
import { SignupWithEmailtype } from "../../../types/signup";



let initialState = {

    isOnBoardingCompleted: false,
    isProfileCompletd: false

}

export const authStatusSlice = createSlice({
    name: 'authStatus',
    initialState,
    reducers: {

        updateOnBoardingStatus: (state, action) => {
            state.isOnBoardingCompleted = action.payload
        },
        updateProfileStatus: (state, action) => {
            state.isProfileCompletd = action.payload
        }
    }

})

export const { updateOnBoardingStatus, updateProfileStatus } = authStatusSlice.actions;
export default authStatusSlice.reducer;