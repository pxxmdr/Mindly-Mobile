import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
  timeout: 8000,
});

export type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  observacao?: string | null;
};

type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
};

type LoginPayload = {
  email: string;
  senha: string;
};

export async function registerPaciente(data: RegisterPayload): Promise<Paciente> {
  const res = await api.post<Paciente>("/auth/register", data);
  return res.data;
}

export async function loginPaciente(data: LoginPayload): Promise<Paciente> {
  const res = await api.post<Paciente>("/auth/login", data);
  return res.data;
}
