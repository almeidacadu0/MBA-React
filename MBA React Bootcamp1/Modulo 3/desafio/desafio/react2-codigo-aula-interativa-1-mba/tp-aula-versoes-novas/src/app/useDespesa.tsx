import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDespesas, IDespesa } from './backend';

export interface despesasCategoria {
  categoria: string;
  valor: number;
}

interface IAllDespesaInfo {
  despesas: IDespesa[];
  totalDespesa: number;
  despesaResumo: despesasCategoria[];
}

export function useDespesa() {
  console.log('Despesa1');
  const params = useParams<{ anoMes: string }>();
  const anoMes = params.anoMes || '2021-06';
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    getDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  const totalDespesa = calculaTotal(despesas);

  function calculaTotal(despesas: IDespesa[]) {
    let total = 0;
    for (const despesa of despesas) {
      total += despesa.valor;
    }
    return total;
  }

  var result: despesasCategoria[] = [];
  despesas.reduce(function (res: IDespesa | any, value: IDespesa | any) {
    if (!res[value.categoria]) {
      // console.log(res);
      res[value.categoria] = { categoria: value.categoria, valor: 0 };
      result.push(res[value.categoria]);
    }
    res[value.categoria].valor += value.valor;
    return res;
  }, {});

  const despesaResumo: despesasCategoria[] = result.sort(
    (n1, n2) => n2.valor - n1.valor
  );

  const allDespesaInfo: IAllDespesaInfo = {
    despesas,
    totalDespesa,
    despesaResumo,
  };
  console.log(allDespesaInfo);

  return allDespesaInfo;
}
