import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SimpleList from '../SimpleList/SimpleList';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          data-testid="close-dialog-button"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const UserInfo = ({ user, customerInfo, toggleShowCustomerInfo }) => (
  <div>
    <Dialog
      disableEscapeKeyDown
      open={customerInfo}
      onClose={toggleShowCustomerInfo}
      data-testid="dialog-wrapper"
    >
      <DialogTitle onClose={toggleShowCustomerInfo}>
        User information
      </DialogTitle>
      <DialogContent>
        <SimpleList data={user} />
      </DialogContent>
    </Dialog>
  </div>
);

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  customerInfo: PropTypes.bool.isRequired,
  toggleShowCustomerInfo: PropTypes.func.isRequired,
};

export default UserInfo;
