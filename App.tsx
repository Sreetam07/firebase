import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from './src/auth/LogInScreen';
import SignUpScreen from './src/auth/SignUpScreen';
import AddProductScreen from './src/products/AddProductScreen';
import EditProductScreen from './src/products/EditProductScreen';
import ProductListScreen from './src/products/ProductListScreen';
import { Provider as ReduxProvider } from 'react-redux';
import {store} from './src/redux/store';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        console.log('User is signed in:', user.uid);
      } else {
        // User is signed out
        console.log('User is signed out');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ReduxProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Product List" component={ProductListScreen}/>
        <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="Add Product" component={AddProductScreen} />
        <Stack.Screen name="Edit Product" component={EditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
