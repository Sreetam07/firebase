import React, { useState, } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { signUpRequest } from '../redux/actions/authActions';


const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const loginError = useSelector(state => state.auth.error); 

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password === confirmPassword) {
      
      dispatch(signUpRequest(email, password));
      setEmail('');
      setPassword('');
      setConfirmPassword('');
   
    } else {
      Alert.alert('Passwords do not match');
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setError(''); 
    
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setError(''); 
  };
  const getErrorMessage = () => {
    if (loginError && loginError.includes('auth/email-already-in-use')) {
      return <Text style={styles.error}>The email address is already in use by another account.</Text>;
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
      <Text style={styles.text}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('LogIn')}>
          Login
        </Text>
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loginError ? <Text style={styles.error}>{getErrorMessage()}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign:'center'
  },
});

export default SignUpScreen;