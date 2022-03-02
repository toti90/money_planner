import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  LinearProgress,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import { Category, Plan } from '../../mock/money-plan';
import styles from 'styled-components';
import OneInputDialog from './OneInputDialog';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentPlan } from '../../store/plan-slice';
import { getPlanById, getPlans, writePlan } from '../../firebaseDatabase';

const Spent = styles.p`
  text-align: end;
  margin-bottom: 0;
`;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));

const PlanCard: React.FC<{ category: Category }> = ({ category }) => {
  const [open, setOpen] = useState(false);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const progress = (category.actualSpent / category.plannedSpent) * 100;
  const dispatch = useAppDispatch();

  const openDialogHandler = () => {
    setOpen(true);
  };

  const closeDialogHandler = (isSave: boolean, result?: string) => {
    setOpen(false);
    if (isSave && result) {
      let newPlan: Plan = {
        ...currentPlan!,
        categories: currentPlan!.categories.map((x) => {
          if (x.name === category.name) {
            return { ...x, actualSpent: x.actualSpent + Number(result) };
          }
          return x;
        }),
      };

      writePlan(newPlan).then((_) => {
        getPlanById(dispatch, currentPlan!.id);
      });
    }
  };

  return (
    <Card sx={{ width: 275, marginRight: '24px', marginBottom: '16px' }}>
      <CardHeader
        title={category.name}
        sx={{ fontWeight: 'bold' }}
      ></CardHeader>
      <CardContent>
        <BorderLinearProgress
          variant="determinate"
          color={
            progress < 50 ? 'primary' : progress <= 100 ? 'warning' : 'error'
          }
          value={progress >= 100 ? 100 : progress}
        />
        <Spent>
          {category.actualSpent} / {<strong>{category.plannedSpent} $</strong>}
        </Spent>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          size="small"
          sx={{ textAlign: 'end' }}
          color="secondary"
          onClick={openDialogHandler}
        >
          Add new spending
        </Button>
      </CardActions>
      <OneInputDialog
        open={open}
        onClose={closeDialogHandler}
        title={`Add new spent to ${category.name}`}
        label="Amount"
        type="number"
      ></OneInputDialog>
    </Card>
  );
};

export default PlanCard;
