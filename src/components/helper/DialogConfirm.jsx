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
      <Button 
    //   variant="outlined" 
      onClick={handleClickOpen} style={props.style}>
        {props.action}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontSize={13} fontWeight={500}  color='red'>
          {props.message}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontSize={13}>
            This action cannot be undone .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{backgroundColor:'navy',color:'white'}}   >Cancel</Button>
          <Button onClick={handleConfirm} style={props.style} autoFocus>
            {props.action}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogConfirm ;