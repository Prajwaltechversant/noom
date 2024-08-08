import {View, Text} from 'react-native';
import React from 'react';
import {ScreenContextProvider} from './src/context/screenContext';
import RootStack from './src/stack/RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import EntryScreen from './src/screens/afterAuth/AppEntryScreen';
import QuizScreen from './src/module/onboardingSurvey/quizScreen';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <ScreenContextProvider>
          {/* <RootStack /> */}
          <QuizScreen />
        </ScreenContextProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
