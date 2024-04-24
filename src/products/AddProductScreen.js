import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addProductRequest } from '../redux/actions/productActions';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (!name.trim() || !price.trim() || !description.trim() || !image.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch(addProductRequest({ name, price, description, image }));

    navigation.navigate('ProductList');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
      Add Product
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default AddProductScreen;
