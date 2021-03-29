import React from 'react';
import Grid from '@material-ui/core/Grid';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Title from '../../components/Title/Title';

const NotFound = () => (
  <Grid
    className="full-height"
    container
    spacing={0}
    justify="center"
    alignItems="center"
  >
    <Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
      <div className="page-wrapper notfound-page">
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
  </Grid>
);

export default NotFound;
