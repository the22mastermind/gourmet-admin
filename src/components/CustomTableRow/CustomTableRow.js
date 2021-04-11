import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PendingIcon from '@material-ui/icons/Done';
import AcceptedIcon from '@material-ui/icons/CheckCircle';
import CompletedIcon from '@material-ui/icons/DoneAll';
import Title from '../Title/Title';
import SelectModal from '../SelectModal/SelectModal';
import UserInfo from '../UserInfo/UserInfo';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailsPanel: {
    backgroundColor: '#eeeeee',
  },
  titleButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButton: {
    marginRight: 12,
  },
});

const CustomTableRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [customerInfo, showCustomerInfo] = useState(false);
  const classes = useRowStyles();

  const toggleOpenStatus = () => {
    setOpenStatus(!openStatus);
  };

  const toggleShowCustomerInfo = () => {
    showCustomerInfo(!customerInfo);
  };

  return (
    <>
      <TableRow className={classes.root} data-testid="order-table-body-row">
        <TableCell component="th" scope="row">
          Order #
          {row.id}
        </TableCell>
        <TableCell align="left">
          {new Date(row.createdAt).toLocaleDateString()}
          {' '}
          {new Date(row.createdAt).toLocaleTimeString()}
        </TableCell>
        <TableCell align="left">
          {row?.User?.firstName}
          {' '}
          {row?.User?.lastName}
        </TableCell>
        <Hidden xsDown>
          <TableCell align="left">
            $
            {row?.total}
          </TableCell>
        </Hidden>
        <Hidden xsDown>
          <TableCell align="left">
            {row?.paymentId}
          </TableCell>
        </Hidden>
        <Hidden xsDown>
          <TableCell align="left">
            <div className={classes.statusWrapper}>
              {row?.status.toUpperCase()}
              {row?.status === 'accepted'
                ? <AcceptedIcon color="secondary" />
                : row?.status === 'pending'
                  ? <PendingIcon color="secondary" /> : <CompletedIcon color="secondary" /> }
            </div>
          </TableCell>
        </Hidden>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            data-testid="row-details-button"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={classes.detailsPanel} data-testid="row-details-panel">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={4}>
              <div className={classes.titleButtonWrapper}>
                <Title text={`Order #${row.id} details`} variant="h6" color="inherit" component="div" />
                <div className={classes.buttonsWrapper}>
                  <Button
                    onClick={toggleOpenStatus}
                    color="secondary"
                    className={classes.updateButton}
                    data-testid="update-status-button"
                  >
                    Update status
                  </Button>
                  <Button
                    onClick={toggleShowCustomerInfo}
                    color="secondary"
                    data-testid="user-info-button"
                  >
                    User info
                  </Button>
                </div>
              </div>
              <Table size="small" aria-label="order-contents">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Id</TableCell>
                    <TableCell>Item name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total cost ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Contents.map((item) => (
                    <TableRow key={item.itemId} data-testid={`item-${item.itemId}-row`}>
                      <TableCell component="th" scope="row">
                        {item.itemId}
                      </TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {item.cost}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <SelectModal
                orderStatus={row.status}
                orderId={row.id}
                openStatus={openStatus}
                toggleOpenStatus={toggleOpenStatus}
              />
              <UserInfo
                user={row.User}
                customerInfo={customerInfo}
                toggleShowCustomerInfo={toggleShowCustomerInfo}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

CustomTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    paymentId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    Contents: PropTypes.arrayOf(
      PropTypes.shape({
        itemId: PropTypes.number.isRequired,
        itemName: PropTypes.string.isRequired,
        cost: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ).isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomTableRow;
