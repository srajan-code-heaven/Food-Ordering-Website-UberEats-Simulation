/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import {
  AppBar,
  Toolbar,
  Hidden,
  ListItemIcon,
  Typography,
  ListItem,
  IconButton,
  ListItemText,
  Avatar,
  Divider,
  List,
  Box,
} from '@material-ui/core';
import {
  Restaurant,
  Home,
  ShoppingCart,
  ExitToApp,
  Favorite,
  Group, AccountCircle,
} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import RecentActors from '@material-ui/icons/RecentActors';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { logout, setSearchValue } from '../state/action-creators/loginActions';
import avatar from '../images/avatar.svg';
import logo from '../images/uber-eats.svg';
import QuantityPopup from './Customer/CustomerCart/QuantityPopup';
// CSS styles
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: '100%',
    minWidth: '250px',
    paddingTop: '64px',
    background: '#7ac356',
    height: '100%',
  },
  avatar: {
    display: 'block',
    margin: '0.5rem auto',
    marginBottom: '4rem',
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  select: {
    color: '#fff',
  },
  listItem: {
    color: '#222',
    fontFamily: 'Galano Grotesque !important',
  },
  root: {
    width: 200,
    marginLeft: '20px',
    '& .MuiOutlinedInput-input': {
      color: 'white',
      padding: '13px 14px',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
      marginLeft: '20px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'white',
    },
    '&:hover .MuiInputLabel-root': {
      color: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiSelect-nativeInput': {
      opacity: 1,
      paddingLeft: '10px',
      height: '100%',
    },
    '& .MuiSelect-select.MuiSelect-select': {
      height: '35px',
    },
  },
}));

const menuItems = [
  {
    listIcon: <Home />,
    listText: 'Dashboard',
    listPath: '/dashboard',
  },
  {
    listIcon: <RecentActors />,
    listText: 'Profile',
    listPath: '/profile',
  },
  {
    listIcon: <Restaurant />,
    listText: 'Menu',
    listPath: '/menu',
  },
  {
    listIcon: <RestaurantMenu />,
    listText: 'Orders',
    listPath: '/orders',
  },
  {
    listIcon: <ExitToApp />,
    listText: 'Logout',
    listPath: '/',
  },
];

const general = [
  {
    listIcon: <Group />,
    listText: 'Sign Up',
    listPath: '/',
  },
  {
    listIcon: <AccountCircle />,
    listText: 'Login',
    listPath: '/login',
  },
];

const customer = [
  {
    listIcon: <Home />,
    listText: 'Dashboard',
    listPath: '/dashboard',
  },
  {
    listIcon: <RecentActors />,
    listText: 'Profile',
    listPath: '/customer/profile',
  },
  {
    listIcon: <Favorite />,
    listText: 'Favorites',
    listPath: '/customer/favorites',
  },
  {
    listIcon: <RestaurantMenu />,
    listText: 'Orders',
    listPath: '/orders',
  },
  // {
  //     listIcon: <ShoppingCart />,
  //     listText: 'Cart',
  //     // listPath: location.pathname
  // },
  {
    listIcon: <ExitToApp />,
    listText: 'Logout',
    listPath: '/',
  },
];

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const cartDetails = useSelector((state) => state.login.cartItems);

  const searchValue = useSelector((state) => state.login.searchString);

  const [state, setState] = useState({
    left: false,
  });
  const [open, setOpen] = useState(false);

  const [searchString, setSearchString] = useState(searchValue);

  const toggleSlider = (slider, openVal) => () => {
    setState({ ...state, [slider]: openVal });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSearchString(searchValue);
  }, [searchValue]);

  const onSearch = async (searchStringVal) => {
    await dispatch(setSearchValue(searchStringVal, history));
  };

  const sideList = (slider) => (
    <Box
      component="div"
      className={classes.menuSliderContainer}
      onClick={toggleSlider(slider, false)}
    >
      <Avatar className={classes.avatar} src={avatar} alt="" />
      <Divider />
      <List>
        {props.user === 'restaurant' && menuItems.map((listItem, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem button key={`restaurant${key}`} component={Link} to={listItem.listPath ? listItem.listPath : ''} onClick={() => { if (listItem.listText === 'Logout') { dispatch(logout(history)); } }}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body1" className={classes.listItem}>{listItem.listText}</Typography>}
            />
          </ListItem>
        ))}
        {props.user === 'customer' && customer.map((listItem, key) => (
          <ListItem button key={`customer${key}`} component={Link} to={listItem.listPath} onClick={() => { if (listItem.listText === 'Logout') { dispatch(logout(history)); } }}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body1" className={classes.listItem}>{listItem.listText}</Typography>}
            />
          </ListItem>
        ))}
        {props.user === 'general' && general.map((listItem, key) => (
          <ListItem button key={`signUp${key}`} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body1" className={classes.listItem}>{listItem.listText}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Box component="nav">
        <AppBar position="fixed" style={{ background: '#222' }}>
          <Toolbar style={{ display: 'flex', width: '100%', padding: 0 }}>
            <MobileeRightMenuSlider
              open={state.left}
              onClose={toggleSlider('left', false)}
              anchor="left"
            >
              {sideList('left')}
            </MobileeRightMenuSlider>
            <IconButton onClick={toggleSlider('left', true)}>
              <DehazeIcon style={{ color: 'white' }} />
            </IconButton>
            <img src={logo} width="120" height="80" alt="" />
            {props.user === 'customer' && location.pathname !== '/customer/cart'
                        && (
                        <>
                          <SearchBar
                            value={searchString}
                            onChange={(newValue) => setSearchString(newValue)}
                            onRequestSearch={() => onSearch(searchString)}
                            onCancelSearch={() => { dispatch(setSearchValue('', history)); }}
                            placeholder="Search"
                            style={{ width: '70%' }}
                          />
                          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%' }}>
                            <IconButton onClick={() => {
                              handleClickOpen();
                            }}
                            >
                              <Badge badgeContent={cartDetails.length} color="secondary">
                                <ShoppingCart style={{ color: 'white' }} />
                              </Badge>
                            </IconButton>
                            <Hidden mdDown>
                              <IconButton onClick={() => { dispatch(logout(history)); }}>
                                <ExitToApp style={{ color: 'white' }} />
                              </IconButton>
                            </Hidden>
                          </div>
                        </>
                        )}
            {props.user === 'restaurant' && (
              <Hidden mdDown>
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <IconButton onClick={() => { dispatch(logout(history)); }}>
                    <ExitToApp style={{ color: 'white' }} />
                  </IconButton>
                </div>
              </Hidden>
            )}
          </Toolbar>
        </AppBar>
        <div>
          <QuantityPopup
            open={open}
            handleClose={handleClose}
            orderDetails={props.order}
          />
        </div>
      </Box>
    </div>
  );
};
Navbar.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  order: PropTypes.any,
  user: PropTypes.any,
  isEdit: PropTypes.bool,
  handleCreate: PropTypes.func,
  handleClose: PropTypes.func,
  dishImage: PropTypes.any,
  dishName: PropTypes.any,
  dishType: PropTypes.any,
  dishDescription: PropTypes.any,
};
export default Navbar;
