import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Plan } from '../../models/plan';
import { getPlanById, writePlan } from '../../firebaseDatabase';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentPlan } from '../../store/plan-slice';

const NewCategoryDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [plannedSpent, setplannedSpent] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
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
    if (
      currentPlan?.categories &&
      currentPlan?.categories.some((x) => x.name === name)
    ) {
      setOpenSnackBar(true);
      return;
    }

    const newPlan: Plan = {
      ...currentPlan!,
      categories: [
        ...(currentPlan?.categories ?? []),
        { name, actualSpent: 0, plannedSpent },
      ],
    };

    writePlan(newPlan).then((_) => {
      getPlanById(dispatch, currentPlan!.id);
      onClose();
    });
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
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
          label="Planned spent ($)"
          type="number"
          fullWidth
          onChange={handlePlannedSpentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          This category name already in use
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default NewCategoryDialog;
