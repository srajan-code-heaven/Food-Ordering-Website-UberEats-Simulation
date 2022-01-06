/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Invoice = (props) => {
  const userDetails = useSelector((state) => state.login.user);
  const restaurants = useSelector((state) => state.login.allRestaurants);
  const [isDelivery, setIsDelivery] = useState(false);

  useEffect(() => {
    if (restaurants.length > 0) {
      restaurants.map((item) => {
        if (item.RestaurantId === props.orderDetails.RestaurantId) {
          if (item.Mode === 'Both' || item.Mode === 'Delivery Available') {
            setIsDelivery(true);
          }
        }
        return true;
      });
    }
  }, []);
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Order Invoice</DialogTitle>
      <DialogContent>
        <div>
          <p style={{ fontWeight: 'bold' }}>Instructions</p>
          <p>{props.orderDetails.Instructions || 'N/A'}</p>
          <p style={{ fontWeight: 'bold' }}>Order Details</p>
          {props.orderDetails.cartDetails
          && props.orderDetails.cartDetails.map((item, index) => (
            <div key={`invoice-${index}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{
                width: '50%', textAlign: 'start', margin: 0, alignSelf: 'center', marginBottom: '10px', marginRight: '20px',
              }}
              >
                {item.DishName}
              </p>
              <p style={{
                fontWeight: 'bold', width: '25%', textAlign: 'end', margin: 0, alignSelf: 'center', marginBottom: '10px', marginRight: '20px',
              }}
              >
                Quantity:
                {item.quantity}
              </p>
              <p style={{
                width: '25%', textAlign: 'end', margin: 0, alignSelf: 'center', marginBottom: '10px', marginLeft: '20px',
              }}
              >
                {item.Price * item.quantity}
                $
              </p>
            </div>
          ))}
          {isDelivery && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 'bold' }}>Delivery Fee:</p>
            <p>{userDetails.DeliveryFee ? userDetails.DeliveryFee : '5$'}</p>
          </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 'bold' }}>Taxes:</p>
            <p>2.5$</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 'bold' }}>Total:</p>
            <p>
              {props.orderDetails.TotalAmount}
              $
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

Invoice.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  orderDetails: PropTypes.any,
};

export default Invoice;
