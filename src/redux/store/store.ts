import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/Auth/loginSlice";



const rootReducers = combineReducers({
    loginSlice: loginSlice
})

const store = configureStore({
    reducer: rootReducers
});


export default store