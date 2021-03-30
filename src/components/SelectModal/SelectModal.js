import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import Loader from '../Loader/Loader';
import FormSelect from '../FormSelect/FormSelect';
import { AlertContext } from '../../context/AlertState';
import { DataContext } from '../../context/DataState';
import { updateService, getService } from '../../utils/api';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));

const options = [
  { id: 1, value: 'pending', label: 'Pending' },
  { id: 2, value: 'accepted', label: 'Accepted' },
  { id: 3, value: 'onthemove', label: 'On the move' },
  { id: 4, value: 'completed', label: 'Completed' },
];

const SelectModal = ({ openStatus, toggleOpenStatus, orderStatus, orderId }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const { getAllOrders } = useContext(DataContext);
  const { handleSubmit, control } = useForm();

  const fetchOrdersList = async () => {
    const { status, data } = await getService('/api/admin/orders');
    if (status === 200) {
      await getAllOrders(data.data);
    }
  };

  const handleUpdateStatus = async (data) => {
    setLoading(true);
    const response = await updateService(`/api/admin/orders/${orderId}`, data);
    if (response.status !== 200) {
      await showAlert({
        type: 'error',
        text: response.error,
      });
      setLoading(false);
    } else {
      const { message } = response.data;
      await showAlert({
        type: 'success',
        text: message,
      });
      // Refresh orders list
      await fetchOrdersList();
      setLoading(false);
      toggleOpenStatus();
    }
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openStatus}
        onClose={toggleOpenStatus}
        data-testid="select-modal"
      >
        <DialogTitle>
          Order #
          {orderId}
          {' '}
          status
        </DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormSelect
              name="status"
              label="Order status"
              control={control}
              defaultValue={orderStatus}
              rules={{ required: true }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </FormSelect>
          </form>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <div className={classes.loaderWrapper}>
              <Loader color="secondary" />
            </div>
          ) : (
            <>
              <Button
                onClick={toggleOpenStatus}
                color="secondary"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit(handleUpdateStatus)}
                color="secondary"
                data-testid="confirm-button"
              >
                Ok
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

SelectModal.propTypes = {
  openStatus: PropTypes.bool.isRequired,
  toggleOpenStatus: PropTypes.func.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default SelectModal;
