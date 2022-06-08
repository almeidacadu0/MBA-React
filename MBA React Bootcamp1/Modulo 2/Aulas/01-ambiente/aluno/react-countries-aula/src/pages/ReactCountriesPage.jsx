import Header from '../components/Header';
import Main from '../components/Main';
import { allCountries } from '../data/countries';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import Countries from '../components/Countries';
import Country from '../components/Country';
export default function ReactCountriesPage() {
  console.log(allCountries);
  const [countryFilter, setCountrFilter] = useState('');
  const [visitedCountries, setVisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountrFilter(newCountryFilter);
  }
  function toggleVisitedCountry(countryId) {
    let newVisitedCountries = [...visitedCountries];
    const isCountryVisited = newVisitedCountries.indexOf(countryId) !== -1;
    if (isCountryVisited) {
      newVisitedCountries = newVisitedCountries.filter(visitedCountryId => {
        return visitedCountryId !== countryId;
      });
    } else {
      newVisitedCountries.push(countryId);
    }

    setVisitedCountries(newVisitedCountries);
  }

  console.log(visitedCountries);
  const countryFilterLowercase = countryFilter.trim().toLocaleLowerCase();

  const filteredCountries =
    countryFilterLowercase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) => {
          return nameLowerCase.includes(countryFilterLowercase);
        })
      : allCountries;

  return (
    <div>
      <Header>react-countries</Header>
      <Main>
        <TextInput
          id="inputCountryFilter"
          labelDescription="Informe o nome do país (pelo menos 3 caracteres):"
          inputValue={countryFilter}
          onInputChange={handleCountryFilterChange}
          autoFocus
        />

        {/* <Countries
          visitedCountries={visitedCountries}
          onCountryClick={toggleVisitedCountry}
        >
          {filteredCountries}
        </Countries> */}

        <Countries>
          <h2 className="text-center font-semibold">
            {filteredCountries.length} país(es)
          </h2>
          <h3 className="text-center font-semibold text-sm">
            {visitedCountries.length} país(es) visitados
          </h3>
          {filteredCountries.map(country => {
            const isVisited = visitedCountries.indexOf(country.id) !== -1;
            return (
              <Country
                isVisited={isVisited}
                onCountryClick={toggleVisitedCountry}
                key={country.id}
              >
                {country}
              </Country>
            );
          })}
        </Countries>
      </Main>

      {/* <div>{allCountries}</div> */}
    </div>
  );
}
