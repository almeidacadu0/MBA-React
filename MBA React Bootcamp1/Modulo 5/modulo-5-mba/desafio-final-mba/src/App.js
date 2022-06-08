import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { apiGetChampionshipData } from './api/api'
import ChampionShipPage from './components/ChampionShipPage'

const FIRST_YEAR = 2003
const LAST_YEAR = 2015

const YEARS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }).map(
  (_, index) => {
    return FIRST_YEAR + index
  }
)

const ROUTES = YEARS.map(year => {
  const yearString = year.toString()

  return {
    id: yearString,
    description: yearString,
    path: `/${yearString}`,
  }
})

export default function App() {
  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">Desafio Final</h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <ul className="flex flex-row flex-wrap">
            {ROUTES.map(({ id, description, path }) => {
              return (
                <li key={id} className="mx-2">
                  <NavLink activeClassName="active-link" to={path}>
                    {description}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>

        <Switch>
          {ROUTES.map(({ id, path }) => {
            return (
              <Route key={id} path={path}>
                <ChampionShipPage />
              </Route>
            )
          })}

          <Route key="home" path="/" exact>
            <Redirect to="/2003" />
          </Route>
        </Switch>
      </main>
    </div>
  )
}
