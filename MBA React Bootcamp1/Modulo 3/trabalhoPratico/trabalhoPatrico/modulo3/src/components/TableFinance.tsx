import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IDespesa } from '../Api/backend';

interface ITableFinanceProps {
  despesas: IDespesa[];
}

export default function TableFinance(props: ITableFinanceProps) {
  const { despesas } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Despesa</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Categoria</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Dia</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Valor (R$)</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map(despesa => {
            return (
              <>
                <TableRow
                  key={despesa.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {despesa.descricao}
                  </TableCell>
                  <TableCell align="left">{despesa.categoria}</TableCell>
                  <TableCell align="left">{despesa.dia}</TableCell>
                  <TableCell align="right">{despesa.valor}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
