import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
} from '@material-ui/core';
import NavigationCard from './NavigationCard';

// CSS styles
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(1),
  },
  title: {
    color: 'tomato',
  },
  subtitle: {
    color: 'tan',
    marginBottom: '3rem',
  },
  typedContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    textAlign: 'center',
    zIndex: 1,
  },
  Header: {
    color: '#222',
    alignSelf: 'center',
    marginLeft: '1.2rem',
    marginBottom: '2rem',
    fontFamily: 'Galano Grotesque',
  },
  container: {
    marginTop: '120px',
  },
}));
const Dashboard = () => {
  const classes = useStyles();

  const history = useHistory();
  const onNavigateOrders = () => {
    history.push('/orders');
  };
  const onNavigateMenu = () => {
    history.push('/menu');
  };
  const onNavigateProfile = () => {
    history.push('/profile');
  };
  return (
    <Box component="div" className={classes.container}>
      <h1 className={classes.Header}>
        Restaurant Dashboard
      </h1>
      <Grid
        container
        justify="center"
        style={{
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <NavigationCard size="40rem" color="#7ac356" navigateFlag label="Orders" onNavigate={onNavigateOrders} source="https://images.unsplash.com/photo-1595285203820-e3b1108345db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80" />
        <NavigationCard size="40rem" color="#7ac356" navigateFlag label="Menu List" onNavigate={onNavigateMenu} source="https://images.unsplash.com/photo-1481931715705-36f5f79f1f3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA3fHxmb29kJTIwb3JkZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
        <NavigationCard size="40rem" color="#7ac356" navigateFlag label="Profile" onNavigate={onNavigateProfile} source="https://images.unsplash.com/photo-1546195643-70f48f9c5b87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" />
      </Grid>
    </Box>
  );
};

export default Dashboard;
