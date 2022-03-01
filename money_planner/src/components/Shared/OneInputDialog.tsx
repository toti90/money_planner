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

const OneInputDialog: React.FC<{
  open: boolean;
  title: string;
  label: string;
  onClose: () => void;
}> = ({ open, title, label, onClose }) => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const newPlan: Plan = {
      id: generateGuid(),
      name: input,
      categories: [],
    };
    writePlan(newPlan).then((x) => {
      getPlans(dispatch);
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={label}
          type="text"
          fullWidth
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OneInputDialog;
