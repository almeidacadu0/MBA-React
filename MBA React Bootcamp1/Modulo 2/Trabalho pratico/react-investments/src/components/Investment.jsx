import Item from './Item';
import _ from 'lodash';

export default function Investment({ children: [investment, reports] = null }) {
  const reportOrder = _.sortBy(reports, ['month']);
  const firstReport = _.first(reportOrder);
  const lastReport = _.last(reportOrder);
  function getTotalRendimento() {
    const totalRendimento = (lastReport.value - firstReport.value).toFixed(2);
    return totalRendimento;
  }

  function getTotalRendimentoPercent() {
    const totalRendimento = getTotalRendimento() * 100;
    const percent = totalRendimento / firstReport.value;
    return percent.toFixed(2);
  }
  getTotalRendimentoPercent();
  return (
    <>
      <div className="border p-2">
        {' '}
        <h2 className="text-center font-semibold text-xl">
          {investment.description}
        </h2>
        <h3 className="text-center font-semibold text-sm">{`Rendimento total:${getTotalRendimento()} (${getTotalRendimentoPercent()}%)`}</h3>
        <ul>
          {reportOrder.map((report, idx) => {
            let oldValue = 1;
            if (idx !== 0) {
              oldValue = reportOrder[idx - 1].value;
            }
            const { id, month, value, year } = report;
            return (
              <Item key={id} label={`${month}/${year}`} oldValue={oldValue}>
                {value}
              </Item>
            );
          })}
        </ul>
      </div>
    </>
  );
}
