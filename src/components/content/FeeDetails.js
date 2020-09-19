import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.outline.container,
  },
  container__heading: {
    ...theme.shape.container__heading,
  },
  heading__h2: {
    ...theme.shape.heading__h2,
  },
}));
const FeeDetails = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.container__heading}>
        <h2 className={classes.heading__h2}>Fee Details</h2>
      </div>
    </div>
  );
};

export default FeeDetails;
