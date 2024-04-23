import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation/Navigation';


const Stack = createStackNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
