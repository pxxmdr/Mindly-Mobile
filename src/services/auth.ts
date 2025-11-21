import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
  timeout: 10000,
});

export type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
};

export type LoginPayload = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  nome: string;
  email: string;
  tipoUsuario: "PACIENTE" | "PSICOLOGO" | string;
  token: string;
};

export async function registerPaciente(
  data: RegisterPayload
): Promise<LoginResponse> {
  try {
    const res = await api.post<LoginResponse>("/auth/register", data);

    await AsyncStorage.setItem("mindly_token", res.data.token);
    await AsyncStorage.setItem("mindly_email", res.data.email);
    await AsyncStorage.setItem("pacienteLogado", JSON.stringify(res.data));

    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      "Erro ao realizar cadastro.";
    throw new Error(msg);
  }
}

export async function loginPaciente(
  data: LoginPayload
): Promise<LoginResponse> {
  try {
    const res = await api.post<LoginResponse>("/auth/login", data);

    await AsyncStorage.setItem("mindly_token", res.data.token);
    await AsyncStorage.setItem("mindly_email", res.data.email);
    await AsyncStorage.setItem("pacienteLogado", JSON.stringify(res.data));

    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      "Credenciais inválidas.";
    throw new Error(msg);
  }
}

export async function getAuthHeaders() {
  const token = await AsyncStorage.getItem("mindly_token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export default api;
