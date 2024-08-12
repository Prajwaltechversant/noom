import { createSlice, current } from "@reduxjs/toolkit";



let initialState = {

    currentSection: 0,
    currentScreen: 0,
    progress: 0


}

export const surveyProgressSlice = createSlice({
    name: 'surveyProgressSlice',
    initialState,

    reducers: {
        updateSurveyProgress: (state, action) => {
            console.log(action,'s')
            return ({
                ...state,
                currentScreen: action.payload.currentScreen,
                currentSection: action.payload.currentSection,
                progress: action.payload.progress
            })
        },
    }

})

export const { updateSurveyProgress} = surveyProgressSlice.actions;
export default surveyProgressSlice.reducer;