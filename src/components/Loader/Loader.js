import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ color, ...rest }) => (
  <div className="center">
    <CircularProgress color={color} {...rest} />
  </div>
);

export default Loader;
