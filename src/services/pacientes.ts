import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
});

export type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  observacao: string | null; 
};

export async function listarPacientes(): Promise<Paciente[]> {
  const resp = await api.get<Paciente[]>("/pacientes");
  return resp.data;
}


export async function buscarPacientePorEmail(
  email: string
): Promise<Paciente> {
  const resp = await api.get<Paciente>(`/pacientes/email/${email}`);
  return resp.data;
}


export async function salvarFeedbackPaciente(
  email: string,
  feedback: string
): Promise<Paciente> {
  const resp = await api.put<Paciente>(`/pacientes/email/${email}/feedback`, {
    feedback,
  });
  return resp.data;
}

export default api;
