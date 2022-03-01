import MonthlyPlanCard from '../Shared/MonthlyPlanCard';
import styled from 'styled-components';
import { MOCK_MONTHLYPLANS } from '../../mock/money-plan';
import ButtonSubHeader from './ButtonsSubHeader';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const MonthlyPlanList = () => {
  const mockDatas = MOCK_MONTHLYPLANS;
  return (
    <MainContainer>
      <ButtonSubHeader></ButtonSubHeader>
      <CardContainer>
        {mockDatas[0].categories.map((x) => (
          <MonthlyPlanCard category={x} key={x.id} />
        ))}
      </CardContainer>
    </MainContainer>
  );
};

export default MonthlyPlanList;
