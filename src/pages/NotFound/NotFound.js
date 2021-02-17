import React from 'react';
import Grid from '@material-ui/core/Grid';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Title from '../../components/Title/Title';

const NotFound = () => (
  <Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
    <div className="notfound-page">
      <ErrorOutline fontSize="large" aria-label="error-icon" />
      <Title
        variant="h4"
        text="Page not found"
        align="left"
        color="textPrimary"
        gutterBottom
      />
    </div>
  </Grid>
);

export default NotFound;
