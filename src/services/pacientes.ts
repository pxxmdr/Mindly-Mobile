import api, { getAuthHeaders } from "./auth";

export type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  observacao: string | null;
};

type PagePacientes = {
  content: Paciente[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export async function listarPacientes(): Promise<Paciente[]> {
  const headers = await getAuthHeaders();

  const resp = await api.get<PagePacientes>("/api/pacientes", {
    headers,
    params: {
      page: 0,
      size: 50,
      sort: "nome,asc",
    },
  });

  return resp.data.content ?? [];
}

export async function buscarPacientePorEmail(
  email: string
): Promise<Paciente> {
  const headers = await getAuthHeaders();

  const resp = await api.get<Paciente>(
    `/api/pacientes/email/${encodeURIComponent(email)}`,
    { headers }
  );

  return resp.data;
}

export async function salvarFeedbackPaciente(
  email: string,
  feedback: string
): Promise<Paciente> {
  const headers = await getAuthHeaders();

  
  const resp = await api.put<Paciente>(
    `/api/pacientes/email/${encodeURIComponent(email)}/feedback`,
    { feedback },
    { headers }
  );

  return resp.data;
}

export default api;
