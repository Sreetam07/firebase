import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();
const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App