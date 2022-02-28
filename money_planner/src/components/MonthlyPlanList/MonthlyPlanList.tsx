import MonthlyPlanCard from '../Shared/MonthlyPlanCard';
import styled from 'styled-components';
import { MOCK_MONTHLYPLANS } from '../../mock/money-plan';

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const MonthlyPlanList = () => {
  const mockDatas = MOCK_MONTHLYPLANS;
  return (
    <Container>
      {mockDatas[0].categories.map((x) => (
        <MonthlyPlanCard category={x} />
      ))}
    </Container>
  );
};

export default MonthlyPlanList;
