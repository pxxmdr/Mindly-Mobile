import api, { getAuthHeaders } from "./auth";

export type IaSugestaoRequest = {
  moodDoDia?: string | null;
  nivelEstresse?: number | null;
  descricaoDia?: string | null;
};

export type IaSugestaoResponse = {
  sugestao: string;
};

export async function gerarSugestaoIA(
  payload: IaSugestaoRequest
): Promise<IaSugestaoResponse> {
  const headers = await getAuthHeaders();

  const res = await api.post<IaSugestaoResponse>(
    "/api/ia/sugestoes",
    {
      moodDoDia: payload.moodDoDia ?? null,
      nivelEstresse: payload.nivelEstresse ?? null,
      descricaoDia: payload.descricaoDia ?? null,
    },
    { headers }
  );

  return res.data;
}
