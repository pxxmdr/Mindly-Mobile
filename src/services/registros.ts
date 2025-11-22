import api, { getAuthHeaders } from "./auth";

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

export type AlertaRegistro = {
  pacienteId: number;
  pacienteNome: string;
  telefone: string;
  moodDia: string;
  descricaoDia: string;
};

type RegistroBackend = {
  id: number;
  dataRegistro: string;
  descricaoDia: string;
  moodDoDia: string;
  nivelEstresse: number;
  qualidadeSono: number;
  atividadeFisica?: string | null;
  motivoGratidao?: string | null;
  avaliacaoPsicologo?: string | null;
};

export type PageRegistros = {
  content: RegistroDiario[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

function mapAtividadeToString(flag: boolean) {
  return flag ? "SIM" : "NAO";
}

function mapAtividadeToBoolean(v?: string | null): boolean {
  if (!v) return false;
  const val = v.toString().toLowerCase();
  return val === "sim" || val === "true" || val === "1";
}

export async function criarRegistro(
  data: RegistroPayload
): Promise<RegistroDiario> {
  const headers = await getAuthHeaders();

  const body = {
    ...data,
    atividadeFisica: mapAtividadeToString(data.atividadeFisica),
  };

  const res = await api.post<RegistroBackend>("/api/registros", body, {
    headers,
  });

  const r = res.data;
  return {
    id: r.id,
    dataRegistro: r.dataRegistro,
    descricaoDia: r.descricaoDia,
    moodDoDia: r.moodDoDia,
    nivelEstresse: r.nivelEstresse,
    qualidadeSono: r.qualidadeSono,
    atividadeFisica: mapAtividadeToBoolean(r.atividadeFisica),
    motivoGratidao: r.motivoGratidao ?? null,
    avaliacaoPsicologo: r.avaliacaoPsicologo ?? null,
  };
}

export async function listarRegistros(
  emailPaciente: string
): Promise<PageRegistros> {
  const headers = await getAuthHeaders();

  const res = await api.get<{
    content: RegistroBackend[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  }>(`/api/registros/paciente/${encodeURIComponent(emailPaciente)}`, {
    headers,
    params: {
      page: 0,
      size: 50,
      sort: "dataRegistro,DESC",
    },
  });

  const raw = res.data;
  const mappedContent: RegistroDiario[] =
    raw.content?.map((r) => ({
      id: r.id,
      dataRegistro: r.dataRegistro,
      descricaoDia: r.descricaoDia,
      moodDoDia: r.moodDoDia,
      nivelEstresse: r.nivelEstresse,
      qualidadeSono: r.qualidadeSono,
      atividadeFisica: mapAtividadeToBoolean(r.atividadeFisica),
      motivoGratidao: r.motivoGratidao ?? null,
      avaliacaoPsicologo: r.avaliacaoPsicologo ?? null,
    })) ?? [];

  return {
    content: mappedContent,
    totalElements: raw.totalElements,
    totalPages: raw.totalPages,
    number: raw.number,
    size: raw.size,
  };
}

export async function atualizarRegistro(
  id: number,
  data: Partial<RegistroPayload>
): Promise<RegistroDiario> {
  const headers = await getAuthHeaders();

  const body: any = { ...data };
  if (typeof data.atividadeFisica === "boolean") {
    body.atividadeFisica = mapAtividadeToString(data.atividadeFisica);
  }

  const res = await api.put<RegistroBackend>(`/api/registros/${id}`, body, {
    headers,
  });

  const r = res.data;
  return {
    id: r.id,
    dataRegistro: r.dataRegistro,
    descricaoDia: r.descricaoDia,
    moodDoDia: r.moodDoDia,
    nivelEstresse: r.nivelEstresse,
    qualidadeSono: r.qualidadeSono,
    atividadeFisica: mapAtividadeToBoolean(r.atividadeFisica),
    motivoGratidao: r.motivoGratidao ?? null,
    avaliacaoPsicologo: r.avaliacaoPsicologo ?? null,
  };
}

export async function deletarRegistro(id: number): Promise<void> {
  const headers = await getAuthHeaders();

  await api.delete(`/api/registros/${id}`, { headers });
}

export async function listarAlertas(): Promise<AlertaRegistro[]> {
  const headers = await getAuthHeaders();

  const res = await api.get<AlertaRegistro[]>("/api/registros/alertas", {
    headers,
  });

  return res.data;
}
