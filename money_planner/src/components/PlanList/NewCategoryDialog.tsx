import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Plan } from '../../mock/money-plan';
import { getPlans, writePlan } from '../../firebaseDatabase';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentPlan } from '../../store/plan-slice';

const NewCategoryDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [plannedSpent, setplannedSpent] = useState(0);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const dispatch = useAppDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePlannedSpentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setplannedSpent(Number(event.target.value));
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const newPlan: Plan = {
      ...currentPlan!,
      categories: [
        ...(currentPlan?.categories ?? []),
        { name, actualSpent: 0, plannedSpent },
      ],
    };
    writePlan(newPlan).then((_) => {
      getPlans(dispatch);
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={handleNameChange}
        />
        <TextField
          margin="dense"
          id="planned"
          label="Planned spent"
          type="number"
          fullWidth
          onChange={handlePlannedSpentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCategoryDialog;
