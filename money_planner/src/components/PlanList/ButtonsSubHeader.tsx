import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectAllPlan,
  selectCurrentPlan,
  setCurrentPlan,
} from '../../store/plan-slice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ButtonsSubHeader = () => {
  const currentPlan = useAppSelector(selectCurrentPlan);
  const allPlan = useAppSelector(selectAllPlan);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedPlan = allPlan.find((x) => x.id === event.target.value);
    if (selectedPlan) {
      dispatch(setCurrentPlan(selectedPlan));
    }
  };
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
        >
          Add new category
        </Button>
      </Container>
    );
  }
  return <div></div>;
};

export default ButtonsSubHeader;
