import React from 'react';

export default function Candidates({
  children: candidate,
  cityName = 'Cidade',
  votingPopulation = 0,
  absence = 0,
  presence = 0,
}) {
  return (
    <div className="border-gray-100 border-2 p2">
      <div>
        <h2 className="items-center justify-center flex flex-auto">
          <strong>{` Eleições em ${cityName}`}</strong>
        </h2>
      </div>
      <div className="items-center justify-center flex flex-auto">
        <span className="p-4">
          <strong>Total de eleitores:</strong>{' '}
          {votingPopulation.toLocaleString('pt-BR')}
        </span>
        <span className="p-4">
          <strong>Abstenção:</strong> {absence.toLocaleString('pt-BR')}
        </span>
        <span>
          <strong>Comparecimento:</strong> {presence.toLocaleString('pt-BR')}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center flex-wrap">
        {candidate}
      </div>
    </div>
  );
}
