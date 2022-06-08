import React, { useEffect, useState } from 'react';
import TelaDespesas from './app/TelaDespesas';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getUserEndpoint, IUser } from './app/backend';
import { LoginScreen } from './app/LoginScreen';
import { authContext } from './app/authContext';

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }
  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <BrowserRouter>
          <Routes>
            <Route path="/despesas/:anoMes" element={<TelaDespesas />} />
            <Route path="/" element={<Navigate to={'/despesas/2021-06'} />} />
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
