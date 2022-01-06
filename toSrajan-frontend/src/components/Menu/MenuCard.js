/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRestaurantMenu } from '../../state/action-creators/restaurantMenuActions';
import { addToCart, removeFromCart } from '../../state/action-creators/loginActions';
import { ColorButton3, ColorButton4 } from '../../constants/index';
import dishPlaceholderImage from '../../images/dishPlaceholderImage.jpeg';
import AddEditMenu from './AddEditMenu';
import './MenuCard.css';

// CSS styles
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Galano Grotesque',
  },
}));

const MenuCard = (props) => {
  const classes = useStyles();
  const childRef = useRef();
  const [open, setOpen] = useState(false);
  const [disableCart, setDisableCart] = useState(false);
  const [disableRemove, setDisableRemove] = useState(true);

  const userDetails = useSelector((state) => state.login.user);
  const cartDetails = useSelector((state) => state.login.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const buffer = [];
    cartDetails.map((item) => {
      buffer.push(item.DishId);
      return true;
    });
    if (buffer.includes(props.menuDetails.DishId)) {
      setDisableCart(true);
      setDisableRemove(false);
    } else {
      setDisableCart(false);
      setDisableRemove(true);
    }
  });

  const handleClickOpen = () => {
    childRef.current.initialize();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteDish = (e) => {
    e.preventDefault();
    const updatedData = {
      RestaurantId: userDetails.id,
      // eslint-disable-next-line no-underscore-dangle
      DishId: props.menuDetails._id,
    };
    dispatch(deleteRestaurantMenu(updatedData));
  };

  return (
    <>
      <div className="col-12 col-sm-8 col-md-6 col-lg-3" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <div className="card cardCustom" justify="center" style={{ width: '18rem' }}>
          <img className="card-img-top" src={dishPlaceholderImage || props.menuDetails.ImageUrl} alt="Bologna" />
          <div className="card-body text-center" style={{ background: '#fff', fontFamily: 'Galano Grotesque' }}>
            <h4 className="card-title" style={{ fontFamily: 'Galano Grotesque' }}>{props.menuDetails.DishName}</h4>
            <h6 className="card-subtitle mb-2 text-muted" style={{ fontFamily: 'Galano Grotesque' }}>
              {props.menuDetails.Category}
              {' '}
              {props.menuDetails.DishType}
            </h6>
            <p className="card-text" style={{ fontFamily: 'Galano Grotesque' }}>{props.menuDetails.DishDesc}</p>
            <h4 className="card-title" style={{ fontFamily: 'Galano Grotesque' }}>
              Price:
              {props.menuDetails.Price}
              $
            </h4>
            {!props.isCustomer && (
            <div className="modify">
              <ColorButton3
                variant="contained"
                color="primary"
                onClick={() => { handleClickOpen(false); }}
                className={classes.button}
              >
                Update
              </ColorButton3>
              <ColorButton4
                variant="contained"
                color="primary"
                onClick={(e) => {
                  deleteDish(e);
                }}
                className={classes.button}
              >
                {' '}
                Delete
              </ColorButton4>
            </div>
            )}
            {props.isCustomer && (
            <div className="modify">
              <ColorButton4
                variant="contained"
                color="primary"
                disabled={disableCart}
                onClick={() => {
                  if (cartDetails.length > 0
                    && props.menuDetails.RestaurantId !== cartDetails[0].RestaurantId) {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm('There are existing items in your cart. Do you want to replace them with a new order?')) {
                      dispatch(addToCart([{ ...props.menuDetails, quantity: 1 }]));
                      setDisableRemove(false);
                      setDisableCart(true);
                      return true;
                    }
                    return false;
                  }
                  dispatch(addToCart([...cartDetails, { ...props.menuDetails, quantity: 1 }]));
                  setDisableRemove(false);
                  setDisableCart(true);
                  return true;
                }}
                className={classes.button}
              >
                {' '}
                Add to Cart
              </ColorButton4>
              <ColorButton3
                variant="contained"
                color="primary"
                disabled={disableRemove}
                onClick={() => {
                  dispatch(removeFromCart(cartDetails, props.menuDetails.DishId));
                  setDisableRemove(true);
                  setDisableCart(false);
                }}
                className={classes.button}
              >
                Remove
              </ColorButton3>
            </div>
            )}
          </div>
        </div>
        {!props.isCustomer && (
        <div>
          <AddEditMenu
            open={open}
            ref={childRef}
            isEdit
            handleClose={handleClose}
            menuDetails={props.menuDetails}
          />
        </div>
        )}
      </div>
    </>
  );
};

MenuCard.propTypes = {
  // ...prop type definitions here
  menuDetails: PropTypes.any,
  isCustomer: PropTypes.any,
};

export default MenuCard;
