import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const meses = [
  { valor: "01", nome: "Janeiro" },
  { valor: "02", nome: "Fevereiro" },
  { valor: "03", nome: "Março" },
  { valor: "04", nome: "Abril" },
  { valor: "05", nome: "Maio" },
  { valor: "06", nome: "Junho" },
  { valor: "07", nome: "Julho" },
  { valor: "08", nome: "Agosto" },
  { valor: "09", nome: "Setembro" },
  { valor: "10", nome: "Outubro" },
  { valor: "11", nome: "Novembro" },
  { valor: "12", nome: "Dezembro" },
];

export default function SelecaoAnoMes(props: {
  anoMes: string;
  onChangeAnoMes: (anoMes: string) => void;
}) {
  const [ano, mes] = props.anoMes.split("-");

  return (
    <div>
      <FormControl>
        <InputLabel id="select-ano">Ano</InputLabel>
        <Select
          labelId="select-ano"
          value={ano}
          onChange={(evt) => props.onChangeAnoMes(evt.target.value + "-" + mes)}
        >
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="select-mes">Mês</InputLabel>
        <Select
          labelId="select-mes"
          value={mes}
          onChange={(evt) => props.onChangeAnoMes(ano + "-" + evt.target.value)}
        >
          {meses.map((mes) => (
            <MenuItem key={mes.valor} value={mes.valor}>
              {mes.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
