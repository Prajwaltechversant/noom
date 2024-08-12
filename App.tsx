import {View, Text} from 'react-native';
import React from 'react';
import {ScreenContextProvider} from './src/context/screenContext';
import RootStack from './src/stack/RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import EntryScreen from './src/screens/afterAuth/AppEntryScreen';
import QuizScreen from './src/module/onboardingSurvey/quizScreen';
import InfoScreen from './src/module/onboardingSurvey/infoScreens/infoScreen1';
import PlanScreen from './src/module/onboardingSurvey/planScreen';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <ScreenContextProvider>
            <RootStack />
            {/* <InfoScreen /> */}
            {/* <PlanScreen /> */}
          </ScreenContextProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
