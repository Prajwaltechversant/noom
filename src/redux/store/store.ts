import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/Auth/loginSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage';
import surveyProgressSliceReducer from "../slices/surveyProgressSlice/surveySlice"
import onBoardingReducer from '../slices/onBoardingAnswers/index'
const rootReducers = combineReducers({
    loginSlice: loginSlice,
    surveyProgressSlice: surveyProgressSliceReducer,
    onBoarding:onBoardingReducer
})


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['surveyProgressSlice', 'loginSlice','onBoarding'],

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