import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from './src/auth/LogInScreen';
import SignUpScreen from './src/auth/SignUpScreen';
import AddProductScreen from './src/products/AddProductScreen';
import EditProductScreen from './src/products/EditProductScreen';
import ProductListScreen from './src/products/ProductListScreen';

const Stack = createStackNavigator();
const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="Add Product" component={AddProductScreen} />
        <Stack.Screen name="Edit Product" component={EditProductScreen} />
        <Stack.Screen name="Product List" component={ProductListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
