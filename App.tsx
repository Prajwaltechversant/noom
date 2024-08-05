import {View, Text} from 'react-native';
import React from 'react';
import {ScreenContextProvider} from './src/context/screenContext';
import RootStack from './src/stack/RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenContextProvider>
        <RootStack />
      </ScreenContextProvider>
    </SafeAreaView>
  );
};

export default App;
