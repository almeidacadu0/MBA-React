import { getCountry, getSummary } from "./services/api.js";

var dif;
let chartinfo = [];
let chartvalues = [];
let kpiConfirmed = document.getElementById("kpiconfirmed");
let kpideaths = document.getElementById("kpideaths");
let kpirecovered = document.getElementById("kpirecovered");
//COMBO BOX PAIS
const countryFilter = document.getElementById("cmbCountry");
let countryCombo = await getSummary();
function loadComboOptions(element, values) {
  values.map((item) =>
    element.insertAdjacentHTML("beforeend", `<option>${item.Country}</option>`)
  );
}
loadComboOptions(countryFilter, countryCombo.Countries);

//FILTRO
let cmbData = document.getElementById("cmbData");
let qtdDays = 0;
let total = 0;

function addData(chart, label, death, confirmed, recovered) {
  if (dif !== -1) {
    chart.data.labels.push(label);
  }
  let data = [];
  let newLabel = "";
  let qtdCasos = 0;
  if (cmbData.value == "Confirmed") {
    data = confirmed;
    newLabel = "Numero de confirmados";
  } else if (cmbData.value == "Deaths") {
    data = death;
    newLabel = "Numero de mortos";
  } else if (cmbData.value == "Recovered") {
    data = recovered;
    newLabel = "Numero de recuperados";
  }
  console.log(data);
  //chart.data.datasets.label = "Casos Confirmados";
  //chart.data.datasets.borderColor = "rgb(60,186,159)";
  //chart.data.datasets.backgroundColor = "rgb(60,186,159,0.1)";
  //console.log(chart.data.datasets);
  chart.data.datasets.forEach((dataset) => {
    console.log(dataset.id);
    if (dataset.id == 1) {
      if (dif !== -1) {
        qtdCasos = data[0] - dif;
        console.log(`${data[0]} - ${dif} = ${qtdCasos}`);
        dataset.data.push(qtdCasos);
        total += qtdCasos;
        qtdDays += 1;
        dataset.label = newLabel;
        dif = data[0];
      } else {
        dif = data[0];
      }
    }
  });

  //chart.data.datasets[1].data = 7000;
  chart.update();
}

function removeData(chart) {
  //  chart.data.labels[0].pop();
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    //dataset.data.pop();
    dataset.data = [];
  });
  chart.update();
}

let dtIni = document.getElementById("date_start");
let dtFim = document.getElementById("date_end");

function getTotal(Country) {
  let confirmedTotal = 0;
  let deathTotal = 0;
  let recTotal = 0;
  Country.forEach((item, index) => {
    confirmedTotal += item.Confirmed;
    deathTotal += item.Deaths;
    recTotal += item.Recovered;
    //console.log(`${index}: ${item.Confirmed}`);
  });
  return [confirmedTotal, deathTotal, recTotal];
}
let btnFiltrar = document.getElementById("filtro");
btnFiltrar.addEventListener("click", async function () {
  dif = -1;
  qtdDays = 0;
  total = 0;
  removeData(linhas);
  let startDate = new Date(dateFns.addDays(dtIni.value, -2)).setHours(
    0,
    0,
    0,
    0
  );
  let endDate = new Date(dtFim.value).setHours(23, 59, 59, 999);

  let res = await getCountry(countryFilter.value, startDate, endDate);
  //kpiConfirmed
  //  console.log(res);
  //  console.log(
  //    dateFns.format(dateFns.addMinutes(res[0].Date, 200), "DD.MM.YYYY")
  //  );
  //let today = new Date();
  //let todayFormatted = dateFns.format(today);
  //console.log(todayFormatted);
  console.log(res);
  res.map((item) =>
    addData(
      linhas,
      dateFns.format(dateFns.addMinutes(item.Date, 200), "DD.MM.YYYY"),
      [item.Deaths],
      [item.Confirmed],
      [item.Recovered]
    )
  );

  function atualizaMedia(chart) {
    chart.data.datasets.forEach((dataset) => {
      //console.log(dataset);
      if (dataset.id == 2) {
        dataset.data.push(total / qtdDays);
        console.log(`${total} / ${qtdDays}`);
      }
    });
    chart.update();
  }
  res.map((item) => atualizaMedia(linhas));

  chartvalues = res.map((item) => item.Deaths);

  //linhas.data.labels.push(chartinfo);
  //linhas.data.datasets[0].data.push(chartvalues);
  let totals = getTotal(res);
  kpiConfirmed.innerHTML = totals[0];
  kpideaths.innerHTML = totals[1];
  kpirecovered.innerHTML = totals[2];
});
//let res = await getCountry();

//GRAFICO LINHAS
let linhas = new Chart(document.getElementById("linhas"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        id: 1,
        label: "Numero de mortos",
        borderColor: "rgb(60,186,159)",
        backgroundColor: "rgb(60,186,159,0.1)",
      },
      {
        data: [],
        id: 2,
        label: "Média de mortos",
        borderColor: "rgb(255,140,13)",
        backgroundColor: "rgb(255,140,13, 0.1)",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left", //top, bottom, left, rigth
      },
      title: {
        display: true,
        text: "Curva de Covid",
      },
      layout: {
        padding: {
          left: 100,
          right: 100,
          top: 50,
          bottom: 10,
        },
      },
    },
  },
});
