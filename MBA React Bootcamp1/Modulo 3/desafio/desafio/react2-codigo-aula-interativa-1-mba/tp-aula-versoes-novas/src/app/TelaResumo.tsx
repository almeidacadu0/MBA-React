import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { despesasCategoria } from './useDespesa';

interface ITelaResumoProps {
  despesaResumo: despesasCategoria[];
}

export default function TelaResumo(props: ITelaResumoProps) {
  return (
    <TableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.despesaResumo.map((despesa, idx) => (
            <TableRow key={idx}>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell align="right">{despesa.valor.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
