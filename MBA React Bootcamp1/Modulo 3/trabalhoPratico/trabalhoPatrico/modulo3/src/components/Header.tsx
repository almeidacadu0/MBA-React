import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TableFinance from './TableFinance';
import { getDespesasMonth, IDespesa } from '../Api/backend';
import { useHistory, useParams } from 'react-router-dom';

interface IHeaderProps {
  valorTotal: number;
}
export default function Header(props: IHeaderProps) {
  const { valorTotal } = props;
  const { month } = useParams<{ month: string }>();
  const [yearUrl, setYearUrl] = useState<string>(month.substring(0, 4));
  const [monthUrl, setMonthUrl] = useState<string>(month.substring(5, 7));
  const history = useHistory();
  useEffect(() => {
    history.push(`${yearUrl}-${monthUrl}`);
  }, [yearUrl, monthUrl, history]);

  // const [despesas, setDespesas] = useState<IDespesa[]>([]);
  // useEffect(() => {
  //   getDespesasMonth().then(setDespesas);
  // }, []);
  const MONTHS: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  function generateYears(): number[] {
    const currentDay = new Date();
    const currentYear: number = (currentDay.getFullYear() as number) - 15;
    const allYears: number[] = [];
    for (let x = 1; x < 30; x++) {
      allYears.push(currentYear + x);
    }
    return allYears;
  }
  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(event.target.value);
    setYearUrl(event.target.value);
  }
  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(event.target.value);
    setMonthUrl(event.target.value);
  }
  const YEARS: number[] = generateYears();
  return (
    <>
      <header>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: 500,
            padding: 5,
          }}
        >
          <Box sx={{ paddingRight: 1 }}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Ano
              </InputLabel>
              <NativeSelect
                defaultValue={yearUrl}
                onChange={handleYearChange}
                inputProps={{
                  name: 'ano',
                  id: 'uncontrolled-native',
                }}
              >
                {YEARS.map((year, index) => {
                  return (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Mês
              </InputLabel>
              <NativeSelect
                defaultValue={monthUrl}
                onChange={handleMonthChange}
                inputProps={{
                  name: 'ano',
                  id: 'uncontrolled-native',
                }}
              >
                {MONTHS.map((month, index) => {
                  const monthPad: string = (index + 1)
                    .toString()
                    .padStart(2, '0');

                  return (
                    <option key={index} value={monthPad}>
                      {month}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              textAlign: 'right',
            }}
          >
            Despesa total:{' '}
            <strong className="Headerlabel">R$ {valorTotal.toFixed(2)}</strong>
          </Box>
        </Box>
      </header>
      {/* <TableFinance despesas={despesas} /> */}
    </>
  );
}
