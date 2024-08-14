import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/Auth/loginSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage';
import surveyProgressSliceReducer from "../slices/surveyProgressSlice/surveySlice"
import onBoardingReducer from '../slices/onBoardingAnswers/index'
import questionsSliceReducer from "../slices/questionsSlice";
import planDetailSliceReducer from "../slices/planSlice";
import authStatusSliceReducer from "../slices/authStatus";
import dailylCourseStatusReducer from "../slices/DailyCourse";

const rootReducers = combineReducers({
    loginSlice: loginSlice,
    surveyProgressSlice: surveyProgressSliceReducer,
    onBoarding: onBoardingReducer,
    questions: questionsSliceReducer,
    planDetails: planDetailSliceReducer,
    authStatus: authStatusSliceReducer,
    dailyStatus: dailylCourseStatusReducer
})


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['surveyProgressSlice', 'loginSlice', 'onBoarding', 'questions', 'planDetails', 'authStatus', 'dailyStatus'],

};

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch