import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const FlashMessage = (props) => {
    const handleClose=()=>{
        props.setOpen(false);
      }
    return (
        <Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    )
}


export default FlashMessage
