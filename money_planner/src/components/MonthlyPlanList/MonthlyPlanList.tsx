import MonthlyPlanCard from '../Shared/MonthlyPlanCard';
import styled from 'styled-components';
import { MOCK_MONTHLYPLANS } from '../../mock/money-plan';
import ButtonSubHeader from './ButtonsSubHeader';
import { selectCurrentMonth } from '../../store/monthlyPlan-slice';
import { useAppSelector } from '../../hooks';

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
  const currentMonthlyPlan = useAppSelector(selectCurrentMonth);

  return (
    <MainContainer>
      <ButtonSubHeader></ButtonSubHeader>
      <CardContainer>
        {currentMonthlyPlan.categories.map((x) => (
          <MonthlyPlanCard category={x} key={x.id} />
        ))}
      </CardContainer>
    </MainContainer>
  );
};

export default MonthlyPlanList;
