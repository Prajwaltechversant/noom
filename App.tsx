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
import EChartComponent from './src/module/echart';
import PaymentScreen1 from './src/module/payment/paymentScreen1';
import PaymementScreen2 from './src/module/payment/paymentScreen2';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <ScreenContextProvider>
            {/* <RootStack /> */}
            {/* <EChartComponent  /> */}
            <PaymementScreen2 />
      
          </ScreenContextProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
