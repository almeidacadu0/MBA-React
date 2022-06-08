import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import { getToday } from './Helpers/dataHelpers';
import DespesasPage from './Pages/DespesasPage';

const month = getToday().substring(0, 7);

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/despesas/:month">
            <DespesasPage></DespesasPage>
          </Route>
          <Redirect to={{ pathname: '/despesas/' + month }}></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
