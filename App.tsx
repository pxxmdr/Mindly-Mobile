import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import EmotionGuideScreen from "./src/screens/EmotionGuideScreen";
import FelicidadeDetailsScreen from "./src/screens/FelicidadeDetailsScreen";
import TristezaDetailsScreen from "./src/screens/TristezaDetailsScreen";
import RaivaDetailsScreen from "./src/screens/RaivaDetailsScreen";
import AnsiedadeDetailsScreen from "./src/screens/AnsiedadeDetailsScreen";
import MedoDetailsScreen from "./src/screens/MedoDetailsScreen";
import PatientFormScreen from "./src/screens/PatientFormScreen";
import PatientHistoryScreen from "./src/screens/PatientHistoryScreen";
import PsychologistHomeScreen from "./src/screens/PsychologistHomeScreen";
import PsychologistPatientDetailsScreen from "./src/screens/PsychologistPatientDetailsScreen";

export type Registro = {
  id: number;
  data: string;
  mood: string;
  descricao: string;
  nivelEstresse: number;
  qualidadeSono: number;
  atividadeFisica: boolean;
  motivoGratidao: string;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  EmotionGuide: undefined;
  FelicidadeDetails: undefined;
  TristezaDetails: undefined;
  RaivaDetails: undefined;
  AnsiedadeDetails: undefined;
  MedoDetails: undefined;
  PatientForm: undefined;
  PatientHistory: { newRecord?: Registro } | undefined;

  PsychologistHome: undefined;
  PsychologistPatientDetails: {
    emailPaciente: string;
    nome: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="EmotionGuide" component={EmotionGuideScreen} />

        <Stack.Screen
          name="FelicidadeDetails"
          component={FelicidadeDetailsScreen}
        />
        <Stack.Screen
          name="TristezaDetails"
          component={TristezaDetailsScreen}
        />
        <Stack.Screen name="RaivaDetails" component={RaivaDetailsScreen} />
        <Stack.Screen
          name="AnsiedadeDetails"
          component={AnsiedadeDetailsScreen}
        />
        <Stack.Screen name="MedoDetails" component={MedoDetailsScreen} />

        <Stack.Screen name="PatientForm" component={PatientFormScreen} />
        <Stack.Screen name="PatientHistory" component={PatientHistoryScreen} />

        <Stack.Screen
          name="PsychologistHome"
          component={PsychologistHomeScreen}
        />
        <Stack.Screen
          name="PsychologistPatientDetails"
          component={PsychologistPatientDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
