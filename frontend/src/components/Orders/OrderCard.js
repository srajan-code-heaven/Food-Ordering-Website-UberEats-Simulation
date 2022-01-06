/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  Hidden,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Clear } from '@material-ui/icons';
import { ColorButton, ColorButton3 } from '../../constants/index';
import DialogComponent from './DialogComponent';
import Invoice from './Invoice';

// CSS styles
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '95vw',
    margin: '1rem auto',
  },
  circle: {
    height: '10px',
    width: '10px',
    display: 'inline-block',
    borderRadius: '50%',
    marginLeft: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const OrderCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const history = useHistory();
  const signInDetails = useSelector((state) => state.signIn.user);
  const userDetails = useSelector((state) => state.login.user);
  const userType = userDetails.userType || signInDetails.userType;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenInvoice = () => {
    setOpenInvoice(true);
  };

  const handleCloseInvvoice = () => {
    setOpenInvoice(false);
  };

  return (
    <Grid item xs={12} sm={12} md={12} key={0}>
      <Card className={classes.cardContainer}>
        <Hidden mdDown>
          <CardActionArea disableRipple style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                id={props.order.OrderId}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (userType === 'restaurant') {
                    history.push({
                      pathname: '/customer/profile',
                      state: { profileDetails: props.order.customerDetails },
                    });
                  }
                }}
              >
                {props.order.CustomerName || userDetails.name}
                {' '}
                <span style={{ color: 'tomato' }}>
                  {' '}
                  #
                  {props.order.OrderId}
                </span>
              </Typography>
              <Typography variant="body2" style={{ color: '#6f7c87', padding: '0 0 10px 0' }} component="span">
                Order Placed at :
                {' '}
                {props.order.CreatedAt}
              </Typography>
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: props.order.Color }} />
                <span style={{ marginLeft: '1rem' }}>{props.order.OrderStatus}</span>
              </Typography>
            </CardContent>
            <CardActions>
              <div style={{ marginRight: '2rem' }}>
                {userType === 'restaurant' ? (
                  <>
                    {props.order.OrderStatus !== 'Order Cancelled' && (
                    <ColorButton onClick={() => { handleClickOpen(); }} variant="contained" startIcon={<EditIcon />} color="secondary" className={classes.button}>
                      Edit
                    </ColorButton>
                    )}
                  </>
                ) : (
                  <>
                    {props.order.OrderStatus !== 'Order Delivered' && props.order.OrderStatus !== 'Order Cancelled' && (
                    <ColorButton3 onClick={() => { handleClickOpen(); }} variant="contained" startIcon={<Clear />} color="secondary" className={classes.button}>
                      Cancel Order
                    </ColorButton3>
                    )}
                    <ColorButton onClick={() => { handleClickOpenInvoice(); }} variant="contained" startIcon={<EditIcon />} color="secondary" className={classes.button}>
                      View Invoice
                    </ColorButton>
                  </>
                )}
              </div>
            </CardActions>
          </CardActionArea>
        </Hidden>
        <Hidden mdUp>
          <CardActionArea disableRipple>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                id={props.order.OrderId}
                onClick={() => {
                  if (userType === 'restaurant') {
                    history.push({
                      pathname: '/customer/profile',
                      state: { profileDetails: props.order.customerDetails },
                    });
                  }
                }}
              >
                {props.order.CustomerName}
                <span style={{ color: 'tomato' }}>
                  {' '}
                  #
                  {props.order.OrderId}
                </span>
              </Typography>
              <Typography variant="body2" style={{ color: '#6f7c87', padding: '0 0 10px 0' }} component="span">
                Order Placed at :
                {' '}
                {props.order.CreatedAt}
              </Typography>
              <Typography variant="body2" component="span">
                <div className={classes.circle} style={{ backgroundColor: props.order.Color }} />
                <span style={{ marginLeft: '1rem' }}>{props.order.OrderStatus}</span>
              </Typography>
            </CardContent>
            <CardActions>
              <div style={{ marginRight: '2rem' }}>
                {userType === 'restaurant' ? (
                  <ColorButton onClick={() => { handleClickOpen(); }} variant="contained" startIcon={<EditIcon />} color="secondary" className={classes.button}>
                    Edit
                  </ColorButton>
                ) : (
                  <>
                    {props.order.OrderStatus !== 'Order Delivered' && (
                    <ColorButton3 onClick={() => { handleClickOpen(); }} variant="contained" startIcon={<Clear />} color="secondary" className={classes.button}>
                      Cancel Order
                    </ColorButton3>
                    )}
                    <ColorButton onClick={() => { handleClickOpenInvoice(); }} variant="contained" startIcon={<EditIcon />} color="secondary" className={classes.button}>
                      View Invoice
                    </ColorButton>
                  </>
                )}
              </div>
            </CardActions>
          </CardActionArea>
        </Hidden>
      </Card>
      <div>
        <DialogComponent
          open={open}
          handleClose={handleClose}
          orderDetails={props.order}
        />
      </div>
      <div>
        <Invoice
          open={openInvoice}
          handleClose={handleCloseInvvoice}
          orderDetails={props.order}
        />
      </div>
    </Grid>
  );
};

OrderCard.propTypes = {
  // ...prop type definitions here
  order: PropTypes.any,
};

export default OrderCard;
