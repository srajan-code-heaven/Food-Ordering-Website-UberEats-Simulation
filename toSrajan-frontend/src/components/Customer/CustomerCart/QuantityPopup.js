/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../state/action-creators/loginActions';
import { ColorButton3 } from '../../../constants/index';

const QuantityPopup = (props) => {
  const cartDetails = useSelector((state) => state.login.cartItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleIncrement = (element) => {
    const latest = cartDetails.map((item) => {
      if (item.DishId === element.DishId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    dispatch(addToCart([...latest]));
  };

  const handleDecrement = (element) => {
    if (element.quantity - 1 > 0) {
      const latest = cartDetails.map((item) => {
        if (item.DishId === element.DishId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      dispatch(addToCart([...latest]));
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Your Cart Details</DialogTitle>
      <DialogContent>
        {cartDetails.map((item, index) => (
          <div key={`cart-item-${index}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{
              width: '50%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
            >
              <IconButton onClick={() => { dispatch(removeFromCart(cartDetails, item.DishId)); }}>
                <Delete />
              </IconButton>
              {item.DishName}
            </div>
            <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button onClick={() => { handleIncrement(item); }}>+</Button>
                <Button disabled>{item.quantity ? item.quantity : 1}</Button>
                <Button onClick={() => { handleDecrement(item); }}>-</Button>
              </ButtonGroup>
            </div>
            <br />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <ColorButton3 variant="contained" disabled={cartDetails.length === 0} onClick={() => { history.push('/customer/cart'); }} color="primary">
          Check Out
        </ColorButton3>
      </DialogActions>
    </Dialog>
  );
};

QuantityPopup.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default QuantityPopup;
