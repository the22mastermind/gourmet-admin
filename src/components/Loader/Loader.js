import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ color }) => (
  <div className="center">
    <CircularProgress color={color} data-testid="loader" />
  </div>
);

Loader.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Loader;
