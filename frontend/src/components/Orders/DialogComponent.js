/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { editRestaurantOrderStatus } from '../../state/action-creators/restaurantOrderActions';
import { ColorButton3 } from '../../constants/index';

const DialogComponent = (props) => {
  const userDetails = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const [status, setStatus] = useState(userDetails.userType === 'restaurant' ? props.orderDetails.OrderStatus : 'Order Cancelled');

  const updateOrderStatus = (e) => {
    e.preventDefault();
    const updatedData = {
      RestaurantId: userDetails.userType === 'restaurant' ? userDetails.id : props.orderDetails.RestaurantId,
      CustomerId: props.orderDetails.CustomerId,
      OrderId: props.orderDetails.OrderId,
      OrderStatus: status,
      Color: status === 'Order Received' ? 'red'
        : status === 'Order Preparing' ? 'yellow'
          : status === 'Order Picked Up' ? 'orange'
            : status === 'Order on the way' ? 'lightgreen'
              : status === 'Order Delivered' ? 'green' : '#8b0000',

    };
    dispatch(editRestaurantOrderStatus(updatedData, userDetails.userType));
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update Order Status</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
                        // label='Change Order Status'
          style={{ marginBottom: '20px' }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
        >
          {userDetails.userType === 'restaurant' && <MenuItem value="Order Received">Order Received</MenuItem>}
          {userDetails.userType === 'restaurant' && <MenuItem value="Order Preparing">Order Preparing</MenuItem>}
          {userDetails.userType === 'restaurant' && <MenuItem value="Order Picked Up">Order Picked Up</MenuItem>}
          {userDetails.userType === 'restaurant' && <MenuItem value="Order on the way">Order on the way</MenuItem>}
          {userDetails.userType === 'restaurant' && <MenuItem value="Order Delivered">Order Delivered</MenuItem>}
          <MenuItem value="Order Cancelled">Cancel Order</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <ColorButton3 variant="contained" onClick={(e) => { updateOrderStatus(e); }} color="primary">
          {userDetails.userType === 'restaurant' ? 'Update' : 'Confirm'}
        </ColorButton3>
      </DialogActions>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  orderDetails: PropTypes.any,
};

export default DialogComponent;
