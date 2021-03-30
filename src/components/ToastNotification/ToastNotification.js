import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ToastNotification = ({
  variant,
  autoHideDuration,
  severity,
  text,
  handleCloseAlert,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleCloseAlert();
  };

  return (
    <div data-testid="alert-wrapper">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open
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

ToastNotification.defaultProps = {
  severity: 'error',
  autoHideDuration: 5000,
};

ToastNotification.propTypes = {
  variant: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  severity: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleCloseAlert: PropTypes.func.isRequired,
};

export default ToastNotification;
