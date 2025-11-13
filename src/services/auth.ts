import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
  timeout: 10000,
});

export type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  observacao?: string | null;
};

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


export async function registerPaciente(
  data: RegisterPayload
): Promise<Paciente> {
  try {
    const res = await api.post<Paciente>("/auth/register", data);
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      "Erro ao realizar cadastro.";
    throw new Error(msg);
  }
}

export async function loginPaciente(data: LoginPayload): Promise<Paciente> {
  try {
    const res = await api.post<Paciente>("/auth/login", data);
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      "Credenciais inválidas.";
    throw new Error(msg);
  }
}

export default api;
