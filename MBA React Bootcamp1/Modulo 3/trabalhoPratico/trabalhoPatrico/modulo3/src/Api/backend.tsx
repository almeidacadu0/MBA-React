export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function getDespesas(): Promise<IDespesa[]> {
  return fetch('http://localhost:3001/despesas').then(resp => {
    return resp.json();
  });
}

export function getDespesasMonth(yearMonth: string): Promise<IDespesa[]> {
  return fetch(
    `http://localhost:3001/despesas?mes=${yearMonth}&_sort=dia`
  ).then(resp => {
    return resp.json();
  });
}
