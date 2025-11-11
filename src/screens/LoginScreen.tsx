import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { loginPaciente } from "../services/auth";

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
      const paciente = await loginPaciente({ email, senha });

      console.log("[MINDLY][LOGIN] OK ->", paciente);

      navigation.reset({
        index: 0,
        routes: [{ name: "EmotionGuide" }],
      });
    } catch (e: any) {
      console.log("[MINDLY][LOGIN] ERRO:", e);
      const msg =
        e?.message || "Não foi possível entrar. Verifique seus dados.";
      setErro(msg);
      Alert.alert("Erro ao entrar", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Mindly</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: PRIMARY,
    textAlign: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
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
