import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addProductRequest } from '../redux/actions/productActions';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleChooseImage = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const source = { uri: response.assets[0].uri };
            setImage(source);
          }
    });
  };

  const handleAddProduct = () => {
    if (!name.trim() || !price.trim() || !description.trim() || !image) {
      alert('Please fill in all required fields');
      return;
    }
    dispatch(addProductRequest({ name, price, description, image: image.uri }));

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
      <Button mode="contained" onPress={handleChooseImage} style={styles.button}>
        Choose Image
      </Button>
      {image && <Image source={image} style={{ width: 200, height: 200, marginBottom: 10 }} />}
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
  button: {
    marginTop: 10,
  },
});

export default AddProductScreen;
