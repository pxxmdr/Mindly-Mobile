import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { loginPaciente } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PRIMARY = "#5ED3C6";

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  const handleLogin = async () => {
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    if (!isValidEmail(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const usuario = await loginPaciente({ email, senha });
console.log("[MINDLY][LOGIN] OK ->", usuario);

const isPsicologo =
  usuario.tipoUsuario === "PSICOLOGO" ||
  email.toLowerCase() === "admin@mindly.com";

if (isPsicologo) {
  navigation.reset({
    index: 0,
    routes: [{ name: "PsychologistHome" }],
  });
} else {
  navigation.reset({
    index: 0,
    routes: [{ name: "PatientForm" }],
  });
}


    } catch (e: any) {
      console.log("[MINDLY][LOGIN] ERRO:", e);

      const backendMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        null;

      const msg =
        backendMsg || "Não foi possível entrar. Verifique seus dados.";

      setErro(msg);
      Alert.alert("Erro ao entrar", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/MindlyLogo.png")}
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo(a)</Text>
        <Text style={styles.subtitle}>
          Acesse seu espaço seguro para acompanhar suas emoções.
        </Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={loading ? undefined : handleLogin}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            Ainda não tem conta?{" "}
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    position: "absolute",
    top: 145,
    alignSelf: "center",
  },
  logoImg: {
    width: 200,
    height: 200,
    marginBottom: -16,
  },
  formContainer: {
    width: "85%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#777777",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 4,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: "#333333",
  },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  registerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 13,
    color: "#666666",
  },
  registerLink: {
    color: PRIMARY,
    fontWeight: "700",
  },
  error: {
    color: "#E53935",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
});
