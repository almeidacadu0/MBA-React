export default function Item({
  children: value = 'Valor',
  label = 'Nome:',
  oldValue = 1,
}) {
  const valueErn = (parseFloat(value) - parseFloat(oldValue)) * 100;

  const percent = parseFloat(valueErn) / oldValue;
  return (
    <div className="">
      <span className="text-sm font-mono ">
        {label} <strong>{`R$ ${value.toFixed(2)}`}</strong>
      </span>

      <span className="text-sm font-mono float-right">
        {oldValue !== 1 ? percent.toFixed(2) : 0}%
      </span>
    </div>
  );
}
