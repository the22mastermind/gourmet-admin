import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormInput = ({ label, variant, ...rest }) => (
  <TextField
    label={label}
    variant={variant}
    {...rest}
  />
);

export default FormInput;
