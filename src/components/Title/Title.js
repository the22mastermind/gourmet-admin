import React from 'react';
import Typography from '@material-ui/core/Typography';

const Title = ({ variant, text, ...rest }) => (
  <Typography variant={variant} {...rest}>
    {text}
  </Typography>
);

export default Title;
