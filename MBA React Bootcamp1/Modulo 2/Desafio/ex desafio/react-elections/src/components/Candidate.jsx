export default function Candidate({
  nome = 'Insira o nome',
  username = 'nome_foto',
  totalVotes = 0,
  votes = 0,
  win = false,
}) {
  // console.log(candidate);
  const percent = (votes * 100) / totalVotes;
  const percentRound = percent.toFixed(2);
  const fontColor = win ? 'text-green-500' : 'text-yellow-500';
  console.log(win);
  return (
    <>
      <div className="w-56 h-38 shadow-md p-2 m-2 items-center space-x-2">
        <div className=" flex flex-row items-center space-x-2">
          <img
            className="w-16 h-16 rounded-full"
            src={`/img/${username}.png`}
            alt={nome}
          />
          <div className="pl-10 flex flex-col items-center space-x-2">
            <div className="font-semibold">
              <span className={fontColor}>{percentRound}%</span>
            </div>
            <div className="text-sm">{votes.toLocaleString('pt-BR')} votos</div>
          </div>
        </div>
        <div className="pt-5 flex flex-col items-center justify-center">
          <span>{nome}</span>
          <span className={`p-5 ${fontColor} font-semibold`}>
            {win ? 'Eleito' : 'Não Eleito'}
          </span>
        </div>
      </div>
    </>
  );
}
