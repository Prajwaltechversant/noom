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
            return ({
                ...state,
                currentScreen: action.payload.currentScreen,
                currentSection: action.payload.currentSection,
                progress: action.payload.progress
            })
        },

        removeSurveyProgress: (state, action) => {
            return ({
                currentScreen: 0,
                currentSection: 0,
                progress: 0
            })
        },
    }

})

export const { updateSurveyProgress, removeSurveyProgress } = surveyProgressSlice.actions;
export default surveyProgressSlice.reducer;