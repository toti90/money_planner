import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  LinearProgress,
  linearProgressClasses,
  styled,
} from '@mui/material';
import React from 'react';
import { Category } from '../../mock/money-plan';
import styles from 'styled-components';

const Spent = styles.p`
  text-align: end;
  margin-bottom: 0;
`;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));

const MonthlyPlanCard: React.FC<{ category: Category }> = ({ category }) => {
  const progress = (category.actualSpent / category.plannedSpent) * 100;

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
          {category.actualSpent} / {<strong>{category.plannedSpent} Ft</strong>}
        </Spent>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" sx={{ textAlign: 'end' }} color="secondary">
          Add new spending
        </Button>
      </CardActions>
    </Card>
  );
};

export default MonthlyPlanCard;
