import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltOutlined from '@material-ui/icons/ListAltOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Loader from '../Loader/Loader';
import ToastNotification from '../ToastNotification/ToastNotification';
import OrdersListPage from '../../pages/OrdersListPage/OrdersListPage';
import { AuthContext } from '../../context/AuthState';
import { AlertContext } from '../../context/AlertState';
import { getService } from '../../utils/api';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  headerWrapper: {
    justifyContent: 'space-between',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerTitle: {
    padding: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const CustomDrawer = ({ auth }) => {
  const classes = useStyles();
  const { logoutUser } = useContext(AuthContext);
  const { alert, showAlert, clearAlert } = useContext(AlertContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAlert = async () => {
    await clearAlert();
  };

  const handleLogout = async () => {
    handleClose();
    setLoading(true);
    const { status, data, error } = await getService('/api/auth/logout');
    if (status !== 200) {
      showAlert({
        type: 'error',
        text: error,
      });
      setLoading(false);
    } else {
      showAlert({
        type: 'success',
        text: data.message,
      });
      setTimeout(async () => {
        await logoutUser();
      }, 2000);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.headerWrapper}>
          <Typography variant="h6" noWrap onClick={toggleDrawer}>
            Gourmet Dashboard
          </Typography>
          {loading ? (
            <Loader color="primary" size={32} />
          ) : auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                data-testid="header-menu-button"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  {auth.user.firstName}
                  {' '}
                  {auth.user.lastName}
                </MenuItem>
                <MenuItem data-testid="logout-button" onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <Typography color="secondary" className={classes.drawerTitle} variant="h6" noWrap onClick={toggleDrawer}>
                Gourmet Dashboard
              </Typography>
            </ListItem>
            <ListItem button autoFocus selected onClick={toggleDrawer}>
              <ListItemIcon><ListAltOutlined /></ListItemIcon>
              <ListItemText data-testid="drawer-item-orders" primary="Orders" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <OrdersListPage />
      </main>
      {alert ? (
        <ToastNotification
          autoHideDuration={5000}
          variant="filled"
          severity={alert?.type}
          text={alert?.text}
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
    </div>
  );
};

CustomDrawer.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomDrawer;
