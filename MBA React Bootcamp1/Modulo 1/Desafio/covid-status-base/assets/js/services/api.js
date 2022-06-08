//import axios from "axios";

const apiPosts = axios.create({
  baseURL: "https://api.covid19api.com/",
});

async function getSummary() {
  let res = await apiPosts.get("summary");
  return res.data;
}

async function getCountry(country, dtini, dtfim) {
  let res = await apiPosts.get(
    `country/${country}?from=${dtini}&to=${dtfim}`
    //"country/Afghanistan?from=2022-01-31T21:00:00.0-03:00Z&to=2022-02-05T21:00:00.0-03:00Z"
    //2020-03-01T00:00:00Z
    //    "country/Afghanistan?from=2020-03-01T21:00:00Z&to=2020-03-03T21:00:00Z"
  );
  return res.data;
}

async function getCountryCombo() {
  let res = await apiPosts.get("coutries");
  return res.data;
}

export { getSummary, getCountry, getCountryCombo };
