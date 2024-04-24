import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import { editProductRequest } from '../redux/actions/productActions';

const EditProductScreen = ({ route, navigation }) => {
  const  productName  = route.params;
  // console.log("product name",productName);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const product = products.find(item => item.name === productName);
   
    if (product) {
      // console.log("product........",product);
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setImage(product.imageUrl);
    }
  }, [products, productName]);

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

  const handleEditProduct = () => {
    if (!name.trim() || !price.trim() || !description.trim() || !image.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch(editProductRequest(productName, { name, price, description, image }));

    navigation.navigate('ProductList');
  };
  // console.log("image ...",image);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button mode="contained" onPress={handleChooseImage} style={styles.button}>
        Choose Image
      </Button>
      {/* {image && <Image source={image} style={{ width: 200, height: 200, marginBottom: 10 }} />} */}
      <Button mode="contained" onPress={handleEditProduct} style={styles.button}>
        Save Changes
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
  },
  button: {
    width: '80%',
    marginTop: 20,
  },
});

export default EditProductScreen;
