/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Delete } from '@material-ui/icons';
import { Grid, IconButton } from '@material-ui/core';
import AddAddress from './AddAddress.js';
import NavBar from '../../navbar.js';
import { getAddress, placeOrder, removeFromCart } from '../../../state/action-creators/loginActions';
import { ColorButton3, ColorButton4 } from '../../../constants/index';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 20px 20px 21px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 20px 0',
    },
  },
  gridClass: {
    // flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  mobileButton: {
    [theme.breakpoints.down('md')]: {
      width: '100% !important',
    },
    // width: '100% !important'
  },
  mobileWrapper: {
    // width: '100% !important',
    [theme.breakpoints.down('md')]: {
      width: '100% !important',
    },
  },
  mobileWrapperAlt: {
    // width: '100% !important',
    // marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      width: '100% !important',
      marginTop: '20px',
    },
  },
}));

const CustomerCart = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login.user);
  const restaurants = useSelector((state) => state.login.allRestaurants);
  const address = useSelector((state) => state.login.addressList);
  const cartDetails = useSelector((state) => state.login.cartItems);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [addressVal, setAddressVal] = useState('');
  const [isDelivery, setIsDelivery] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAddress(userDetails.id));
  }, []);
  const setAddress = (item) => {
    const value = `${item.AddressLine1}, ${item.AddressLine2}, ${item.City}, ${item.State}, ${item.Country}, ${item.PinCode}`;
    setAddressVal(item);
    setDeliveryAddress(value);
  };

  useEffect(() => {
    restaurants.map((item) => {
      if (item.RestaurantId === cartDetails[0].RestaurantId) {
        if (item.Mode === 'Both' || item.Mode === 'Delivery Available') {
          setIsDelivery(true);
        }
      }
      return true;
    });
  }, []);

  const placeOrderRequest = () => {
    const { RestaurantId } = cartDetails[0];
    if (cartDetails.some((item) => item.RestaurantId !== RestaurantId)) {
      alert('Select Orders belonging to only 1 restaurant');
    } else {
      const latestData = {
        CustomerId: userDetails.id,
        deliveryInstructions,
        RestaurantId,
        OrderStatus: 'Order Received',
        CreatedAt: new Date().toLocaleString(),
        Color: 'red',
        TotalAmount: isDelivery
          ? (cartDetails.reduce((prev, cur) => prev + (cur.Price * cur.quantity), 0) + 7.5)
          : (cartDetails.reduce((prev, cur) => prev + (cur.Price * cur.quantity), 0) + 2.5),
        DeliveryAddress: addressVal,
        // cartDetails: JSON.stringify(cartDetails),
        cartDetails,
      };
      dispatch(placeOrder(latestData, history));
    }
  };

  return (
    <div>
      <NavBar user="customer" />
      <div style={{ margin: '8rem 1rem 4rem 1rem' }}>
        <div className={classes.header}>
          <h2 style={{ fontFamily: 'Galano Grotesque', alignSelf: 'center' }}>Checkout Page</h2>
          <hr />
        </div>
        <Grid
          className={classes.gridClass}
          container-fluid={1}
          style={{
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <div
            className={classes.mobileWrapper}
            style={{
              width: '45%', height: '100%', display: 'flex', flexDirection: 'column', background: 'white',
            }}
          >
            <label style={{ alignSelf: 'center' }}>Your Cart Items</label>
            <br />
            {cartDetails.map((item, index) => (
              <div key={`cart-${index}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton onClick={() => { dispatch(removeFromCart(cartDetails, item.DishId)); }}>
                  <Delete />
                </IconButton>
                <p style={{
                  width: '50%', textAlign: 'start', margin: 0, alignSelf: 'center',
                }}
                >
                  {item.DishName}
                </p>
                <p style={{
                  fontWeight: 'bold', width: '25%', textAlign: 'end', margin: 0, alignSelf: 'center',
                }}
                >
                  Quantity:
                  {item.quantity}
                </p>
                <p style={{
                  width: '25%', textAlign: 'end', margin: 0, alignSelf: 'center',
                }}
                >
                  {item.Price * item.quantity}
                  $
                </p>
              </div>
            ))}
            <br />
            <TextField
              fullWidth
              label="Select Delivery Address"
              variant="outlined"
              style={{ marginBottom: '20px' }}
              onChange={(e) => setAddress(e.target.value)}
              select
            >
              {address.map((item, index) => <MenuItem key={`address-${index}`} value={item}>{item.SaveAsName}</MenuItem>)}
            </TextField>
            <label htmlFor="story">Add special instructions</label>
            <textarea id="deliveryInstructions" rows="5" onChange={(e) => { setDeliveryInstructions(e.target.value); }} />
            <br />
            <p>
              Deliver To:
              {deliveryAddress}
            </p>
            <ColorButton3
              variant="contained"
              color="primary"
              className={classes.mobileButton}
              style={{ width: '50%', marginTop: '20px', alignSelf: 'center' }}
              onClick={() => {
                handleClickOpen();
              }}
            >
              {' '}
              Add Delivery Address
              {' '}
            </ColorButton3>
          </div>
          <div
            className={classes.mobileWrapperAlt}
            style={{
              width: '45%', height: '100%', display: 'flex', flexDirection: 'column', background: '#e0e0e0',
            }}
          >
            <label style={{ alignSelf: 'center' }}>Proceed to checkout</label>
            <br />
            <div style={{ margin: '0 20px 0 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Subtotal Amount:</p>
                <p>
                  {isDelivery
                    ? cartDetails.reduce((prev, cur) => prev + (cur.Price * cur.quantity), 0) + 7.5
                    : cartDetails.reduce((prev, cur) => prev + (cur.Price * cur.quantity), 0) + 2.5}
                  $
                </p>
              </div>
              {isDelivery && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Delivery Fee:</p>
                <p>{userDetails.DeliveryFee ? userDetails.DeliveryFee : '5$'}</p>
              </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Taxes:</p>
                <p>2.5$</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Total:</p>
                <p>
                  {isDelivery
                    ? cartDetails.reduce((prev, cur) => prev + (cur.Price * cur.quantity), 0) + 7.5
                    : cartDetails.reduce((prev, cur) => prev + (cur.Price * cur.quantity), 0) + 2.5}
                  $
                </p>
              </div>
            </div>
            <ColorButton4
              variant="contained"
              color="primary"
              disabled={!deliveryAddress}
              onClick={() => {
                placeOrderRequest();
              }}
              className={classes.button}
            >
              {' '}
              Place Order
            </ColorButton4>
          </div>
        </Grid>
      </div>
      <div>
        <AddAddress
          open={open}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default CustomerCart;
