import { IDespesa } from "./backend";

export default function ExibicaoTotal(props: { despesas: IDespesa[] }) {
  const total = calculaTotal(props.despesas);

  return <strong>Despesas totais: R$ {total}</strong>;
}

function calculaTotal(despesas: IDespesa[]) {
  let total = 0;
  for (const despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}
