import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { apiGetChampionshipData } from '../api/api'

export default function ChampionShipPage() {
  const [loading, setLoading] = useState(true)
  const [ranking, setRanking] = useState([])

  const { pathname } = useLocation()
  const year = pathname.substring(1)

  useEffect(() => {
    async function getRankingFromBackend() {
      setLoading(true)
      const backendData = await apiGetChampionshipData(year)
      setRanking(backendData)
      setLoading(false)
    }

    getRankingFromBackend()
  }, [year])

  if (loading) {
    return (
      <div className="text-center my-4">
        <ClipLoader />
      </div>
    )
  }

  return (
    <>
      <h2 className="text-center my-4 font-semibold text-lg">
        Campeonato Brasileiro de {year}
      </h2>

      <table>
        <thead>
          <tr>
            <th className="w-10">&nbsp;</th>
            <th className="w-10">&nbsp;</th>
            <th className="w-48">&nbsp;</th>
            <th className="w-10">P</th>
            <th className="w-10">V</th>
            <th className="w-10">E</th>
            <th className="w-10">D</th>
            <th className="w-10">GP</th>
            <th className="w-10">GC</th>
            <th className="w-10">S</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map(({ teamName, imageUrl, data }, index) => {
            const position = (index + 1).toString().padStart(2, '0')

            const rowBackgroundColor = index % 2 === 0 ? 'white' : 'bg-gray-100'

            const {
              balance,
              defeats,
              draws,
              scoredGoals,
              takenGoals,
              points,
              victories,
            } = data

            return (
              <tr
                key={teamName}
                className={`text-center ${rowBackgroundColor}`}
              >
                <td>{position}</td>

                <td>
                  <img src={`/img/${imageUrl}`} alt={teamName} />
                </td>

                <td className="text-left">{teamName}</td>
                <td>{points}</td>
                <td>{victories}</td>
                <td>{draws}</td>
                <td>{defeats}</td>
                <td>{scoredGoals}</td>
                <td>{takenGoals}</td>
                <td>{balance}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
