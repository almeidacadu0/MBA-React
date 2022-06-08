import axios from 'axios'
import {
  helperFormatTeamName,
  helperGetImageNameFrom,
} from '../helpers/helpers'

function getStatisticsFrom(teamRawData) {
  const {
    total_derrotas: defeats,
    total_empates: draws,
    total_gols_marcados: scoredGoals,
    total_gols_sofridos: takenGoals,
    total_pontos: points,
    total_vitorias: victories,
  } = teamRawData

  const balance = scoredGoals - takenGoals

  return {
    balance,
    defeats,
    draws,
    points,
    scoredGoals,
    takenGoals,
    victories,
  }
}

function getRankingFrom(rawData) {
  const lastRound = rawData.length - 1

  const ranking = rawData[lastRound].partidas
    .flatMap(
      ({
        mandante: host,
        visitante: visitor,
        pontuacao_geral_mandante: hostRawData,
        pontuacao_geral_visitante: visitorRawData,
      }) => {
        const hostData = getStatisticsFrom(hostRawData)
        const visitorData = getStatisticsFrom(visitorRawData)

        return [
          {
            teamName: helperFormatTeamName(host),
            imageUrl: helperGetImageNameFrom(host),
            data: hostData,
          },
          {
            teamName: helperFormatTeamName(visitor),
            imageUrl: helperGetImageNameFrom(visitor),
            data: visitorData,
          },
        ]
      }
    )
    .sort((a, b) => b.data.points - a.data.points)

  return ranking
}

async function apiGetChampionshipData(year) {
  const { data } = await axios.get(`http://localhost:3001/${year}`)
  const ranking = getRankingFrom(data)
  return ranking
}

export { apiGetChampionshipData }
