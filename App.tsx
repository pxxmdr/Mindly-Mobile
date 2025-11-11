import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EmotionGuideScreen from './src/screens/EmotionGuideScreen';
import FelicidadeDetailsScreen from './src/screens/FelicidadeDetailsScreen';
import TristezaDetailsScreen from './src/screens/TristezaDetailsScreen';
import RaivaDetailsScreen from './src/screens/RaivaDetailsScreen';
import AnsiedadeDetailsScreen from './src/screens/AnsiedadeDetailsScreen';
import MedoDetailsScreen from './src/screens/MedoDetailsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  EmotionGuide: undefined;
  FelicidadeDetails: undefined;
  TristezaDetails: undefined;
  RaivaDetails: undefined;
  AnsiedadeDetails: undefined;
  MedoDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EmotionGuide" component={EmotionGuideScreen} />
        <Stack.Screen name="FelicidadeDetails" component={FelicidadeDetailsScreen} />
        <Stack.Screen name="TristezaDetails" component={TristezaDetailsScreen} />
        <Stack.Screen name="RaivaDetails" component={RaivaDetailsScreen} />
        <Stack.Screen name="AnsiedadeDetails" component={AnsiedadeDetailsScreen} />
        <Stack.Screen name="MedoDetails" component={MedoDetailsScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
