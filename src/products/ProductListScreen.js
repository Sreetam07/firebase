import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest, deleteProductRequest } from '../redux/actions/productActions';
import { logoutRequest } from '../redux/actions/authActions';
import { Button, Text } from 'react-native-paper';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, []);

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigation.navigate('LogIn');
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const handleEditProduct = (productId) => {
    navigation.navigate('EditProduct', { productId });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductRequest(productId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Edit" onPress={() => handleEditProduct(item.id)} />
              <Button title="Delete" onPress={() => handleDeleteProduct(item.id)} />
            </View>
          </View>
        )}
      />

      <View style={styles.bottomButtonsContainer}>
        <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
          Add Product
        </Button>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ProductListScreen;
