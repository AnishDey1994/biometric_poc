import React from 'react';
import type {Node} from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import { StyleSheet, View } from 'react-native';
import LoginView from './components/login.js';
import HomeView from './components/home.js';

const Stack = createNativeStackNavigator();


const App = () => {
 const BiometryTypes = {
   TouchId: 'TouchId',
   FaceId: 'FaceId',
   FingerPrint: 'FingerPrint'
 }


//  Keychain && Keychain.getSupportedBiometryType().then(biometryType => {
//    switch (biometryType) {
//      case BiometryTypes.TouchId:
//        console.log('TouchId FaceId supported');
//      case BiometryTypes.TouchId:
//        console.log('FaceId id supported');
//      case BiometryTypes.FingerPrint:
//        console.log('FingerPrint id supported');
//      default:
//        console.log('No biometric found');
//    }
//  })

  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#367c2b',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Home" component={HomeView} />
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default App;
