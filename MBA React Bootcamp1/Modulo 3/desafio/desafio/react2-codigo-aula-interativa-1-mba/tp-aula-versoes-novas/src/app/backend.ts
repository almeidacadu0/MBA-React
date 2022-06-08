export interface IUser {
  nome: string;
  email: string;
}

export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function getDespesas(mes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`, {
    credentials: 'include',
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao carregar dados');
    }
  });
}

export function signInEndpoint(email: string, senha: string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: 'include',
  }).then(handleResponse);
}
export function signOutEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/finalizar`, {
    credentials: 'include',
    method: 'POST',
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
