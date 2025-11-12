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
import { registerPaciente } from "../services/auth";

const PRIMARY = "#5ED3C6";

export default function RegisterScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
  };

  const handleRegister = async () => {
    setErro("");

    if (!nome.trim()) return setErro("Informe seu nome.");
    if (!emailRegex.test(email)) return setErro("Informe um e-mail válido.");
    if (!telefone.trim() || telefone.replace(/\D/g, "").length < 10) {
      return setErro("Informe um telefone válido.");
    }
    if (!senha || senha.length < 6) {
      return setErro("A senha deve ter pelo menos 6 caracteres.");
    }

    try {
      setLoading(true);
      await registerPaciente({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        telefone: telefone.trim(),
      });

      Alert.alert(
        "Cadastro concluído",
        "Sua conta Mindly foi criada com sucesso. Agora é só fazer login!"
      );
      navigation.navigate("Login");
    } catch (e: any) {
      console.log("[MINDLY][REGISTER] ERRO:", e);

      const backendMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        null;

      const msg =
        backendMsg ||
        "Não foi possível concluir o cadastro. Tente novamente mais tarde.";

      setErro(msg);
      Alert.alert("Erro no cadastro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO FIXA NO TOPO */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/MindlyLogo.png")}
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>
          Comece a registrar suas emoções de forma simples e segura.
        </Text>

        <TextInput
          placeholder="Nome completo"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <TextInput
          placeholder="Telefone"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          value={telefone}
          onChangeText={(text) => setTelefone(formatTelefone(text))}
          keyboardType="phone-pad"
        />

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
          placeholder="Senha (mínimo 6 caracteres)"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={loading ? undefined : handleRegister}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>
            Já tem conta? <Text style={styles.registerLink}>Entrar</Text>
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
    top: 110,
    alignSelf: "center",
    pointerEvents: "none",
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
    fontSize: 12,
    color: "#777777",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 2,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
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
    marginTop: 14,
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
    marginBottom: 6,
  },
});
