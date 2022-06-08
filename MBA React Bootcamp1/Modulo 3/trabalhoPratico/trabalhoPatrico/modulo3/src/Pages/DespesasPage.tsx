import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IDespesa, getDespesasMonth } from '../Api/backend';
import Header from '../components/Header';
import TableFinance from '../components/TableFinance';

export default function DespesasPage() {
  const { month } = useParams<{ month: string }>();
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  let valores: number[] = [];
  let total: number = 0;
  useEffect(() => {
    getDespesasMonth(month).then(setDespesas);
  }, [month]);
  console.log(despesas.length);
  if (despesas.length !== 0) {
    valores = despesas.map(despesa => despesa.valor);
    total = valores.reduce((a, b) => a + b);
  }
  return (
    <div>
      <Header valorTotal={total}></Header>
      <TableFinance despesas={despesas} />
    </div>
  );
}
