import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, List, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsRequest,
  deleteProductRequest,
} from '../redux/actions';

interface Product {
  id: string;
  name: string;
  price: number;
  
}

interface ProductsListScreenProps {
  navigation: any; 
}

const ProductsListScreen: React.FC<ProductsListScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleAddProduct = () => {
    navigation.navigate("Add Product");
  };

  const handleEditProduct = (product: Product) => {
    navigation.navigate('Edit Product', { product });
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProductRequest(productId));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <List.Item
      title={item.name}
      description={`$${item.price}`}
      onPress={() => handleEditProduct(item)}
      right={(props) => (
        <Button
          children={undefined} icon="delete"
          onPress={() => handleDeleteProduct(item.id)}
          {...props}        />
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddProduct}
        label="Add Product"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default ProductsListScreen;
