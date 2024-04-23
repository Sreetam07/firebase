import { View, Text } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsListScreen from './ProductListScreen';
import AddProductScreen from './AddProductScreen';
import EditProductScreen from './EditProductScreen';

const ProductsStack = createStackNavigator();

const ProductStack = () => {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={{ headerTitle: 'Products' }}
      />
      <ProductsStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ headerTitle: 'Add Product' }}
      />
      <ProductsStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ headerTitle: 'Edit Product' }}
      />
    </ProductsStack.Navigator>
  )
}

export default ProductStack