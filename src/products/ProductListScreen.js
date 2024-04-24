import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest, deleteProductRequest } from '../redux/actions/productActions';
import { logoutRequest } from '../redux/actions/authActions';
import { Button, Text, Card } from 'react-native-paper'; 

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

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

  const handleEditProduct = (productName) => {
    navigation.navigate('EditProduct',  productName );
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductRequest(productId));
  };

  const renderProductItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.buttonsContainer}>
          <Button mode="outlined" onPress={() => handleEditProduct(item.name)}>
            Edit
          </Button>
          <Button mode="outlined" onPress={() => handleDeleteProduct(item.id)}>
            Delete
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
console.log("products",products);
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderProductItem}
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
  card: {
    marginBottom: 10,
    elevation: 4, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
