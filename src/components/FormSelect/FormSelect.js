import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const FormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  rules,
}) => {
  const classes = useStyles();
  const labelId = `${name}-label`;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={(
          <Select labelId={labelId} label={label} data-testid="select-input">
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
      />
    </FormControl>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      props: PropTypes.shape({
        children: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  rules: PropTypes.shape({
    required: PropTypes.bool.isRequired,
  }).isRequired,
};

export default FormSelect;
