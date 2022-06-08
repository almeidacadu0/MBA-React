import { Box, Button } from '@mui/material';
import React from 'react';
import { useAuthContext } from './authContext';
import { makeStyles } from '@mui/styles';
import { signOutEndpoint } from './backend';

const useStyles = makeStyles({
  botao: {
    padding: '0 20px',
  },
  boxInfo: {
    marginTop: '30px',
  },
});

export default function Header() {
  const classes = useStyles();
  const { user, onSignOut } = useAuthContext();
  console.log(user);

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }
  return (
    <div>
      <Box display="flex">
        <Box>
          <h1>Despesas</h1>
        </Box>
        <Box flex="1"></Box>
        <Box display="flex" className={classes.boxInfo}>
          <span className={classes.botao}> {`Olá ${user.nome}`} </span>
          <Box>
            <Button
              className={classes.botao}
              variant="outlined"
              onClick={signOut}
            >
              Sair
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
