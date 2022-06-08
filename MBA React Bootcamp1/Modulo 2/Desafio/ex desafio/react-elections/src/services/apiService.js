import { read } from './httpServices';

export async function apiGetCities() {
  const allCities = await read('/cities');
  return allCities;
}
export async function apiGetCandidates() {
  const allCandidates = await read('/candidates');
  return allCandidates;
}
export async function apiGetCityElection(id) {
  const allCitiesElection = await read(`/election?cityId=${id}`);
  return allCitiesElection;
}
