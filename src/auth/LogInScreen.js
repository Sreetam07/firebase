import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { loginRequest } from '../redux/actions/authActions';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const dispatch = useDispatch();
  const loginError = useSelector(state => state.auth.error); 
  console.log("log in  error in login",loginError);


  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    
    dispatch(loginRequest(email, password));
    setEmail('');
    setPassword('');
 
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
    if (loginError && loginError.includes('auth/invalid-credential')) {
      return <Text style={styles.error}>The supplied auth credential is incorrect, malformed or has expired.</Text>;
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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
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

export default LoginScreen;
