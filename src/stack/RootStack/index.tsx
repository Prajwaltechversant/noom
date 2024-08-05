import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from '../authStack'

const RootStack:React.FC = () => {
  return (
    <NavigationContainer>
        <AuthStack  />
    </NavigationContainer>
  )
}

export default RootStack 