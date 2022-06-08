import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';

type TStyleHeaderProps = {
  bg?: string;
};

const StyledHeader = styled.h1<TStyleHeaderProps>`
  color: ${props => props.theme.main};
  font-size: 42px;
  background: ${props => (props.bg ? props.bg : 'transparent')};
`;
const StyledData = styled('p')`
  color: ${props => props.theme.secondary};
  font-weight: 700;
  font-size: 24px;
`;

type TStyledButtonProps = {
  variant?: 'success' | 'failed';
};

const RotateKeyFrame = keyframes`
from {
  transform: rotate(0deg)
}
to{
  transform: rotate(360deg)
}`;

const Rotate = styled.div`
  animation: ${RotateKeyFrame} 0.5s;
  width: 100px;
`;

const themeBlue = {
  main: 'blue',
  secondary: '8d8dff',
};
const themeRed = {
  main: 'red',
  secondary: 'ff4343',
};

const StyledButton = styled.button<TStyledButtonProps>`
  background-color: transparent;
  border-radius: 8px;
  border: 2px solid;
  padding: 8px 16px;

  &:hover {
    cursor: pointer;
    /* animation: ${RotateKeyFrame} 0.5s; */
    background-color: lightgrey;
  }

  border-color: ${props => {
    if (props.variant === 'success') {
      return css`
        border-color: green;
        color: green;
      `;
    }
    if (props.variant === 'failed') {
      return css`
        border-color: red;
        color: red;
      `;
    }
  }};
`;

// const StyledSuccessButton = styled(StyledButton)`
//   border-color: green;
//   color: green;
// `;
// const StyledFailButton = styled(StyledButton)`
//   border-color: red;
//   color: red;
// `;
function App() {
  const [theme, setTheme] = useState(themeBlue);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <Rotate> */}
        <StyledHeader>Carlos Almeida</StyledHeader>
        <div>
          <StyledButton
            style={{ marginRight: '8px' }}
            onClick={() => setTheme(themeBlue)}
          >
            Set Blue theme
          </StyledButton>
          <StyledButton onClick={() => setTheme(themeRed)}>
            Set red theme
          </StyledButton>
        </div>
        {/* </Rotate>
      <Rotate>
      <span>Teste</span>
    </Rotate> */}
        <StyledData>almeidacadu0@gmail.com</StyledData>
        <StyledData>111111111</StyledData>
        <StyledData>Brasil</StyledData>
        <StyledButton variant="success">Adicionar</StyledButton>
        <StyledButton style={{ marginLeft: '8px' }} variant="failed">
          Remover
        </StyledButton>
        <StyledButton style={{ marginLeft: '8px' }}>Detalhes</StyledButton>
        Sample
      </ThemeProvider>
    </div>
  );
}

export default App;
