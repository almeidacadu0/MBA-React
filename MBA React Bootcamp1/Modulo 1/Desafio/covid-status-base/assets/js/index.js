import { getSummary } from "./services/api.js";

let totalConfirmados = document.getElementById("confirmed");
let totalMortos = document.getElementById("death");
let totalRecuperados = document.getElementById("recovered");
let dataAtualizacao = document.getElementById("date");

//CHAMA API COM INFORMAÇÕES
let res = await getSummary();

//SEPARA AS INFO EM VARIAVEIS
let newConfirmados = res.Global.NewConfirmed;
let newMortos = res.Global.NewDeaths;
let newRecuperados = res.Global.NewRecovered;
console.log(res.Countries);

//FORMATA A DATA
let dateFormatted = dateFns.format(res.Date, "DD.MM.YYYY HH:MM");

//ATUALIZA INFO NO HTML
totalConfirmados.innerHTML = res.Global.TotalConfirmed;
totalMortos.innerHTML = res.Global.TotalDeaths;
totalRecuperados.innerHTML = res.Global.TotalRecovered;
dataAtualizacao.innerHTML = dataAtualizacao.innerHTML + dateFormatted;

//GRAFICO PIZZA
let pizza = new Chart(document.getElementById("pizza"), {
  type: "pie",
  data: {
    labels: ["Confirmados", "Recuperados", "Mortes"],
    datasets: [
      {
        data: [newConfirmados, newRecuperados, newMortos],
        backgroundColor: ["#3e95cd", "#3c8523", "#42F39f"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribuição de novos casos",
      },
    },
  },
});

//ORDERNANDO POR TOTALDEATHS E SEPARA EM VARIAVEIS
let resCountriesGroupBy = _.orderBy(res.Countries, ["TotalDeaths"], ["desc"]);

//res.Countries.sort((i1, i2) => {
//  if (i1.TotalDeaths > i2.TotalDeaths) {
//    return -1;
//  } else if (i1.TotalDeaths < i2.TotalDeaths) {
//    return 1;
//  } else {
//    return 0;
//  }
//});
let top10 = resCountriesGroupBy.slice(0, 10);
let top10Names = top10.map((item) => item.Country);
let top10Numbers = top10.map((item) => item.TotalDeaths);
//GRAFICO BARRAS
let bar = new Chart(document.getElementById("barras"), {
  type: "bar",
  data: {
    labels: top10Names,
    datasets: [
      {
        //label: "Planejado",
        //label: NONAME,
        data: top10Numbers,
        backgroundColor: "#FF010E",
      },
    ],
  },
  options: {
    reponsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total de Mortes por país - Top 10",
      },
    },
  },
});
