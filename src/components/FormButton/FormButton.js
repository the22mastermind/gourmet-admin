import React from 'react';
import Button from '@material-ui/core/Button';

const FormButton = ({ label, color, variant, ...rest }) => (
  <Button
    variant={variant}
    color={color}
    {...rest}
  >
    {label}
  </Button>
);

export default FormButton;
