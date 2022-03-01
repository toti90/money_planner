import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

const OneInputDialog: React.FC<{
  open: boolean;
  title: string;
  label: string;
  type: string;
  onClose: (isSave: boolean, result?: string) => void;
}> = ({ open, title, label, type, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleClose = () => {
    onClose(false);
  };

  const handleSave = () => {
    onClose(true, inputValue);
    // const newPlan: Plan = {
    //   id: generateGuid(),
    //   name: planName,
    //   categories: [],
    // };
    // writePlan(newPlan).then((x) => {
    //   getPlans(dispatch);
    //   onClose();
    // });
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
          type={type}
          fullWidth
          onChange={handleInputValueChange}
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
