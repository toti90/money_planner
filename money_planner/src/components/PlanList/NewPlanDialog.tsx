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
import { generateGuid } from '../../helpers/guidGenerator';
import { getPlans, writePlan } from '../../firebaseDatabase';
import { useAppDispatch } from '../../hooks';

const NewPlanDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [planName, setPlanName] = useState('');
  const dispatch = useAppDispatch();

  const handlePlanNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const newPlan: Plan = {
      id: generateGuid(),
      name: planName,
      categories: [],
    };
    writePlan(newPlan).then((x) => {
      getPlans(dispatch);
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new plan</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Plan name"
          type="text"
          fullWidth
          onChange={handlePlanNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPlanDialog;
