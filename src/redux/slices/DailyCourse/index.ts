import { createSlice } from '@reduxjs/toolkit';


type DailyStatus = {
    isFirstTime: string | Date
}

let initialState: DailyStatus = {
    isFirstTime: ''
}

export const dailCourseStatus = createSlice({
    name: 'dailyStatus',
    initialState,

    reducers: {
        addDailyStatus: (state, action) => {
            // let newDate = new Date()
            state.isFirstTime = action.payload
        },
    },
});

export const { addDailyStatus } = dailCourseStatus.actions;
export default dailCourseStatus.reducer;
