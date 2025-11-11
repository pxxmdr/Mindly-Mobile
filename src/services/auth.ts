export type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
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
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    id: Date.now(),
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
  };
}

export async function loginPaciente({ email }: LoginPayload): Promise<Paciente> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    id: 1,
    nome: 'Paciente Mindly',
    email,
    telefone: '(11) 99999-9999',
  };
}
