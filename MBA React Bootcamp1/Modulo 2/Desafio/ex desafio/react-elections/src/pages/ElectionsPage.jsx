import React, { useEffect, useState } from 'react';
import Candidate from '../components/Candidate';
import Candidates from '../components/Candidates';
import Header from '../components/Header';
import Main from '../components/Main';
import {
  apiGetCandidates,
  apiGetCities,
  apiGetCityElection,
} from '../services/apiService';

export default function ElectionsPage() {
  const [allCities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [selectedElections, setSelectedElections] = useState([]);
  useEffect(() => {
    (async function getAllCities() {
      try {
        const backEndAllCities = await apiGetCities();
        const sortAllCities = backEndAllCities.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setAllCities(sortAllCities);
        setSelectedCity(sortAllCities[0]);
        await getAllCitiesElection(sortAllCities[0].id);
      } catch (error) {
        console.log(error.messsage);
      }
    })();
    (async function getAllCandidates() {
      try {
        const backEndCandidates = await apiGetCandidates();
        setAllCandidates(backEndCandidates);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  function selectCityById(id) {
    const selectedCitieIndex = allCities.findIndex(city => city.id === id);
    setSelectedCity(allCities[selectedCitieIndex]);
  }

  async function getAllCitiesElection(newCitie) {
    try {
      const selectedCitieElection = await apiGetCityElection(newCitie);
      setSelectedElections(selectedCitieElection);
    } catch (error) {
      console.log(error.messsage);
    }
  }

  async function handleChangeCitie(event) {
    const newCitie = event.target.value;
    console.log('newcitie' + newCitie);
    selectCityById(newCitie);
    const selectedCitieElection = await getAllCitiesElection(newCitie);
    console.log(selectedCitieElection);
  }
  return (
    <div>
      <Header>react-elections</Header>
      <Main>
        <h2 className="items-center justify-center flex flex-auto">
          Escolha o município
        </h2>
        <div className="items-center justify-center flex flex-auto m-2">
          <select onChange={handleChangeCitie}>
            {allCities.map(citie => {
              const { id, name } = citie;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Candidates
            cityName={selectedCity.name}
            votingPopulation={selectedCity.votingPopulation}
            absence={selectedCity.absence}
            presence={selectedCity.presence}
          >
            {selectedElections
              ?.map(election => {
                const candidate = allCandidates.filter(candidate => {
                  if (candidate.id === election.candidateId) {
                    return true;
                  } else {
                    return false;
                  }
                });

                return { ...candidate[0], votes: election.votes };
              })
              .sort((a, b) => b.votes - a.votes)
              .map((candidate, idx) => {
                const { id, name, username, votes } = candidate;
                return (
                  <Candidate
                    key={id}
                    nome={name}
                    username={username}
                    totalVotes={selectedCity.presence}
                    votes={votes}
                    win={idx === 0 ? true : false}
                  />
                );
              })}
          </Candidates>
        </div>
      </Main>
    </div>
  );
}
