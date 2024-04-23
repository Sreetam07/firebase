import React, { useState,useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from '../auth/LogInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import ProductListScreen from '../products/ProductListScreen';
import AddProductScreen from '../products/AddProductScreen';
import EditProductScreen from '../products/EditProductScreen';
import auth from '@react-native-firebase/auth';


const Stack = createStackNavigator();

const Navigation = () => {
const [user, setUser] = useState(false);

useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
        // User is signed in
        setUser(true);
        console.log('User is signed in:', user.uid);
        } else {
        // User is signed out
        setUser(false);
        console.log('User is signed out');
        }
    });
    return unsubscribe;
    }, []);
  const initialRouteName = user ? 'ProductList' : 'LogIn';

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {!user && (
        <>
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
        </>
      )}
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
