import { useState } from 'react';

import Box from '@mui/material/Box';

import SelecaoAnoMes from './SelecaoAnoMes';
import ExibicaoTotal from './ExibicaoTotal';
import TabelaDespesas from './TabelaDespesas';

import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { Tab, Tabs } from '@mui/material';

import PropTypes from 'prop-types';
import TelaResumo from './TelaResumo';
import { useDespesa } from './useDespesa';

interface ITabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TelaDespesas() {
  const params = useParams<{ anoMes: string }>();
  const anoMes = params.anoMes || '2021-06';
  const navigate = useNavigate();

  const { despesas, totalDespesa, despesaResumo } = useDespesa();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box padding="50px 0">
        <Header></Header>
      </Box>
      <Box display="flex" alignItems="center">
        <SelecaoAnoMes anoMes={anoMes} onChangeAnoMes={onChangeAnoMes} />
        <Box flex="1" />
        <ExibicaoTotal total={totalDespesa} />
      </Box>
      <Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Resumo" {...a11yProps(0)} />
            <Tab label="Detalhes" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TelaResumo despesaResumo={despesaResumo} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TabelaDespesas despesas={despesas} />
        </TabPanel>
      </Box>
    </>
  );

  function onChangeAnoMes(novoAnoMes: string) {
    navigate(`/despesas/${novoAnoMes}`);
  }
}
