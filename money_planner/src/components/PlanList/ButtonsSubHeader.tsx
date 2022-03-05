import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectAllPlan,
  selectCurrentPlan,
  setCurrentPlan,
} from '../../store/plan-slice';
import OneInputDialog from '../Shared/OneInputDialog';
import { generateGuid } from '../../helpers/guidGenerator';
import { Plan } from '../../models/plan';
import { getPlans, writePlan } from '../../firebaseDatabase';
import { selectIsLoading, setIsLoading } from '../../store/global-slice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Heading = styled.h1`
  margin: 0;
`;

const ButtonsSubHeader = () => {
  const [open, setOpen] = useState(false);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const allPlan = useAppSelector(selectAllPlan);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedPlan = allPlan.find((x) => x.id === event.target.value);
    if (selectedPlan) {
      dispatch(setCurrentPlan(selectedPlan));
    }
  };

  const openDialogHandler = () => {
    setOpen(true);
  };

  const closeDialogHandler = (isSave: boolean, result?: string) => {
    setOpen(false);
    if (isSave && result) {
      dispatch(setIsLoading(true));
      const newPlan: Plan = {
        createdDate: new Date().getTime(),
        id: generateGuid(),
        name: result,
        categories: [],
      };
      writePlan(newPlan).then((x) => {
        getPlans(dispatch);
        dispatch(setIsLoading(false));
      });
    }
  };

  if (isLoading && !currentPlan) {
    return <></>;
  }

  const beVisible = currentPlan && allPlan.length > 0;

  if (beVisible) {
    return (
      <Container>
        <FormControl sx={{ width: 275 }}>
          <InputLabel>Plan</InputLabel>
          <Select
            id="demo-simple-select"
            value={currentPlan?.id}
            label="Age"
            onChange={handleChange}
          >
            {allPlan.map((x) => (
              <MenuItem value={x.id} key={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          sx={{ width: '200px' }}
          onClick={openDialogHandler}
        >
          Add new Plan
        </Button>
        <OneInputDialog
          open={open}
          onClose={closeDialogHandler}
          title="Add new plan"
          label="Plan"
          type="text"
        ></OneInputDialog>
      </Container>
    );
  }
  return (
    <Container>
      <Heading>There are no plan, please create one</Heading>
      <Button
        variant="contained"
        type="button"
        color="secondary"
        sx={{ width: '200px' }}
        onClick={openDialogHandler}
      >
        Add first Plan
      </Button>
      <OneInputDialog
        open={open}
        onClose={closeDialogHandler}
        title="Add new plan"
        label="Plan"
        type="text"
      ></OneInputDialog>
    </Container>
  );
};

export default ButtonsSubHeader;
