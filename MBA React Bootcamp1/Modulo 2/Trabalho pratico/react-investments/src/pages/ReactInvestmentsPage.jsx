import Header from '../components/Header';
import Investment from '../components/Investment';
import Investments from '../components/Investments';
import Main from '../components/Main';
import { allInvestments } from '../data/investments';

export default function ReactInvestmentsPage() {
  const allInvestmentsNames = allInvestments.investments;
  const allReports = allInvestments.reports;
  return (
    <div>
      <Header> react-investments v1.0.1</Header>

      <Main>
        <Investments>
          {allInvestmentsNames.map(investment => {
            const reportInvestment = allReports.filter(report => {
              return report.investmentId.includes(investment.id);
            });
            return (
              <Investment key={investment.id}>
                {investment}
                {reportInvestment}
              </Investment>
            );
          })}
        </Investments>
      </Main>
    </div>
  );
}
