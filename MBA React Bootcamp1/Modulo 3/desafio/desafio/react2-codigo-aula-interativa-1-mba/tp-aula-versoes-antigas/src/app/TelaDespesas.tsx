import { useEffect, useState } from "react";
import { getDespesas, IDespesa } from "./backend";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import SelecaoAnoMes from "./SelecaoAnoMes";
import ExibicaoTotal from "./ExibicaoTotal";
import TabelaDespesas from "./TabelaDespesas";

import { useHistory, useParams } from "react-router-dom";

export default function TelaDespesas() {
  const params = useParams<{ anoMes: string }>();
  const history = useHistory();

  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    getDespesas(params.anoMes).then(setDespesas);
  }, [params.anoMes]);

  return (
    <Container>
      <Box display="flex" alignItems="center">
        <SelecaoAnoMes anoMes={params.anoMes} onChangeAnoMes={onChangeAnoMes} />
        <Box flex="1" />
        <ExibicaoTotal despesas={despesas} />
      </Box>
      <TabelaDespesas despesas={despesas} />
    </Container>
  );

  function onChangeAnoMes(novoAnoMes: string) {
    history.push(`/despesas/${novoAnoMes}`);
  }
}
