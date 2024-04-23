/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from '@firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDttKcJvqu6sDkVBuEffitCdLa6Oci3_Vc",
    authDomain: "authentication-2e1d7.firebaseapp.com",
    projectId: "authentication-2e1d7",
    storageBucket: "authentication-2e1d7.appspot.com",
    messagingSenderId: "410570047822",
    appId: "1:410570047822:web:8530236a8e827388149e1f",
    measurementId: "G-J7RBRBWC8L"
  };

initializeApp(firebaseConfig);


AppRegistry.registerComponent(appName, () => App);
