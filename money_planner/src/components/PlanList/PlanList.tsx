import PlanCard from '../Shared/PlanCard';
import styled from 'styled-components';
import ButtonSubHeader from './ButtonsSubHeader';
import {
  selectCurrentPlan,
  setCurrentPlan,
  setAllPlan,
} from '../../store/plan-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { Category, MOCK_MONTHLYPLANS } from '../../mock/money-plan';
import { getPlans, writePlan } from '../../firebaseDatabase';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const PlanList = () => {
  const currentPlan = useAppSelector(selectCurrentPlan);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPlans(dispatch);
  }, []);

  return (
    <MainContainer>
      <ButtonSubHeader></ButtonSubHeader>
      <h1>{currentPlan?.name}</h1>
      <Button
        variant="contained"
        type="button"
        color="secondary"
        sx={{ width: '275px', marginBottom: '16px' }}
      >
        Add new Category
      </Button>
      <CardContainer>
        {currentPlan?.categories &&
          currentPlan?.categories.map((x: Category, i: number) => (
            <PlanCard category={x} key={i} />
          ))}
      </CardContainer>
    </MainContainer>
  );
};

export default PlanList;
