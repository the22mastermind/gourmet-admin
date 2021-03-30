import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IdIcon from '@material-ui/icons/ArrowRight';
import UserIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import AddressIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleList = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main list items">
        <ListItem>
          <ListItemIcon>
            <IdIcon />
          </ListItemIcon>
          <ListItemText primary={`#${data?.id}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary={`${data?.firstName} ${data?.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={data?.phoneNumber} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddressIcon />
          </ListItemIcon>
          <ListItemText primary={data?.address} />
        </ListItem>
      </List>
    </div>
  );
};

SimpleList.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleList;
