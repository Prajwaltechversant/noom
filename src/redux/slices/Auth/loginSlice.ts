import { createSlice } from "@reduxjs/toolkit";
import { SignupWithEmailtype } from "../../../types/signup";



let initialState = {

    formData: {
        email: undefined,
        password: undefined
    },
    error: {
        email: undefined,
        password: undefined
    }
}

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        addData: (state, action) => {

            state.formData = action.payload
        },
        addError: (state, action) => {
            const type:keyof SignupWithEmailtype = action.payload.type
            state.error = action.payload
        }
    }

})

export const { addData,addError } = loginSlice.actions;
export default loginSlice.reducer;