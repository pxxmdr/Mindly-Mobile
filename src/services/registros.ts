import api from "./auth";

export type RegistroDiario = {
  id: number;
  dataRegistro: string;
  descricaoDia: string;
  moodDoDia: string;
  nivelEstresse: number;
  qualidadeSono: number;
  atividadeFisica: boolean;
  motivoGratidao?: string | null;
  avaliacaoPsicologo?: string | null;
};

export type RegistroPayload = {
  emailPaciente: string;
  dataRegistro: string;
  descricaoDia: string;
  moodDoDia: string;
  nivelEstresse: number;
  qualidadeSono: number;
  atividadeFisica: boolean;
  motivoGratidao?: string | null;
};

export async function criarRegistro(
  data: RegistroPayload
): Promise<RegistroDiario> {
  const res = await api.post<RegistroDiario>("/registros", data);
  return res.data;
}

export async function listarRegistros(
  emailPaciente: string
): Promise<RegistroDiario[]> {
  const res = await api.get<RegistroDiario[]>(
    `/registros/paciente/${emailPaciente}`
  );
  return res.data;
}

export async function atualizarRegistro(
  id: number,
  data: Partial<RegistroPayload>
): Promise<RegistroDiario> {
  const res = await api.put<RegistroDiario>(`/registros/${id}`, data);
  return res.data;
}

export async function deletarRegistro(id: number): Promise<void> {
  await api.delete(`/registros/${id}`);
}
