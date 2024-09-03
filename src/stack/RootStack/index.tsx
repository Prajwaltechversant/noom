import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../authStack';
import AppStack from '../appStack';
import auth from '@react-native-firebase/auth';

const RootStack: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default RootStack;
