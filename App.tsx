import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenContextProvider } from './src/context/screenContext';
import RootStack from './src/stack/RootStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from "@react-native-community/netinfo";

const App = () => {

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (offline) {
        Alert.alert('No Internet', 'Please check your internet connection', [
          { text: 'OK' },
        ]);
      }
    });
    return () => removeNetInfoSubscription();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScreenContextProvider>
            <RootStack />
          </ScreenContextProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
