import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ToastNotification = ({
  variant,
  autoHideDuration,
  severity,
  text,
  showToast,
  setShowToast,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={showToast}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} variant={variant} onClose={handleClose} severity={severity}>
          {text}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ToastNotification;
