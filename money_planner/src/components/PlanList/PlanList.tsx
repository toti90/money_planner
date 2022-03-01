import PlanCard from '../Shared/PlanCard';
import styled from 'styled-components';
import ButtonSubHeader from './ButtonsSubHeader';
import {
  selectCurrentPlan,
  setCurrentPlan,
  setAllPlan,
} from '../../store/plan-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { Category, MOCK_MONTHLYPLANS } from '../../mock/money-plan';
import { getPlans, writePlan } from '../../firebaseDatabase';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import NewCategoryDialog from './NewCategoryDialog';

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
  const [open, setOpen] = useState(false);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPlans(dispatch);
  }, []);

  const openDialogHandler = () => {
    setOpen(true);
  };

  const closeDialogHandler = () => {
    setOpen(false);
  };

  return (
    <MainContainer>
      <ButtonSubHeader></ButtonSubHeader>
      <h1>{currentPlan?.name}</h1>
      <Button
        variant="contained"
        type="button"
        color="secondary"
        sx={{ width: '275px', marginBottom: '16px' }}
        onClick={openDialogHandler}
      >
        Add new Category
      </Button>
      <CardContainer>
        {currentPlan?.categories &&
          currentPlan?.categories.map((x: Category, i: number) => (
            <PlanCard category={x} key={i} />
          ))}
      </CardContainer>
      <NewCategoryDialog
        open={open}
        onClose={closeDialogHandler}
      ></NewCategoryDialog>
    </MainContainer>
  );
};

export default PlanList;
