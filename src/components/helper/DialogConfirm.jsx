import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogConfirm = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    props.handleAction()
    setOpen(false);
  };

  return (
    <>
      <button 
        onClick={handleClickOpen} style={props.style}>
        {props.action}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontSize={11}  fontWeight={600}  color='black'>
          {props.message}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontSize={11}>
            {/* This action cannot be undone . */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{backgroundColor:'gray',fontSize:'10px', fontFamily:'Arsenal SC serif',color:'white'}}   >Cancel</Button>
          <Button onClick={handleConfirm} style={{backgroundColor:'navy',fontSize:'10px', fontFamily:'Arsenal SC serif',color:'white'}} autoFocus>
            {props.action}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogConfirm ;