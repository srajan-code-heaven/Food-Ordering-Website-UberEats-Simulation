/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import { getRestaurantOrders, getCustomerOrders } from '../../state/action-creators/restaurantOrderActions';
import Navbar from '../navbar';
import OrderCard from './OrderCard';

// CSS styles
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
  },
  container: {
    flexDirection: 'column !important',
    marginTop: '4rem',
    paddingTop: '2rem',
  },
  cardContainer: {
    width: '95vw',
    margin: '1rem auto',
  },
  circle: {
    height: '10px',
    width: '10px',
    display: 'inline-block',
    borderRadius: '50%',
  },
  button: {
    margin: theme.spacing(1),
  },
  ticketsHeader: {
    color: '#222',
    alignSelf: 'center',
    marginLeft: '3rem',
    fontFamily: 'Galano Grotesque',
    [theme.breakpoints.down('md')]: {
      marginLeft: '1rem',
    },
  },
  filter: {
    marginBottom: '20px',
    marginRight: '3rem',
    width: '20%',
    alignSelf: 'center',
    fontFamily: 'Galano Grotesque',
    [theme.breakpoints.down('md')]: {
      marginRight: '1rem',
      width: '50%',
    },
  },
}));

const Orders = () => {
  const classes = useStyles();
  const signInDetails = useSelector((state) => state.signIn.user);
  const userDetails = useSelector((state) => state.login.user);
  const userType = userDetails.userType || signInDetails.userType;
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const history = useHistory();
  const dispatch = useDispatch();

  const [filterType, setFilterType] = useState('All Orders');

  useEffect(() => {
    if (userType === 'restaurant') {
      dispatch(getRestaurantOrders(userDetails.id, history));
    } else {
      dispatch(getCustomerOrders(userDetails.id, history));
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component="div" className={classes.mainContainer}>
      <Navbar user={userType} />
      <Grid container className={classes.container} justify="center">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <h2 className={classes.ticketsHeader}>
            Orders list
          </h2>
          <TextField
            variant="outlined"
            label="Select Filter type"
            className={classes.filter}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            select
          >
            <MenuItem value="All Orders">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: 'blue' }} />
                <span style={{ marginLeft: '1rem' }}>All Orders</span>
              </Typography>
            </MenuItem>
            <MenuItem value="Order Received">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: 'red' }} />
                <span style={{ marginLeft: '1rem' }}>Order Received</span>
              </Typography>
            </MenuItem>
            <MenuItem value="Order Preparing">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: 'yellow' }} />
                <span style={{ marginLeft: '1rem' }}>Order Preparing</span>
              </Typography>
            </MenuItem>
            <MenuItem value="Order Picked Up">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: 'orange' }} />
                <span style={{ marginLeft: '1rem' }}>Order Picked Up</span>
              </Typography>
            </MenuItem>
            <MenuItem value="Order on the way">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: 'lightgreen' }} />
                <span style={{ marginLeft: '1rem' }}>Order on the way</span>
              </Typography>
            </MenuItem>
            <MenuItem value="Order Delivered">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: 'green' }} />
                <span style={{ marginLeft: '1rem' }}>Order Delivered</span>
              </Typography>
            </MenuItem>
            <MenuItem value="Order Cancelled">
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: '#8b0000' }} />
                <span style={{ marginLeft: '1rem' }}>Order Cancelled</span>
              </Typography>
            </MenuItem>
          </TextField>
        </div>
        <hr />
        {filterType === 'All Orders' && orderDetails.length > 0 ? orderDetails
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((order, index) => <OrderCard order={order} key={`order${index}`} />) : ''}
        {filterType !== 'All Orders' && orderDetails.length > 0 && orderDetails
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
            order.OrderStatus === filterType ? <OrderCard order={order} key={`order${index}`} /> : ''))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={orderDetails.length ? orderDetails.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Orders;
