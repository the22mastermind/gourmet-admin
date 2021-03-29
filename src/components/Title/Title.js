import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Title = ({ variant, text, align, color, gutterBottom }) => (
  <Typography
    variant={variant}
    align={align}
    color={color}
    gutterBottom={gutterBottom}
  >
    {text}
  </Typography>
);

Title.defaultProps = {
  align: 'left',
  gutterBottom: true,
};

Title.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  align: PropTypes.string,
  color: PropTypes.string.isRequired,
  gutterBottom: PropTypes.bool,
};

export default Title;
