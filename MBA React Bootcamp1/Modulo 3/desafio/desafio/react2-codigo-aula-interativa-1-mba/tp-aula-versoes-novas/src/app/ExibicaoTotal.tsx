interface IExibicaoTotalProps {
  total: number;
}

export default function ExibicaoTotal(props: IExibicaoTotalProps) {
  return <strong>Despesas totais: R$ {props.total.toFixed(2)}</strong>;
}
