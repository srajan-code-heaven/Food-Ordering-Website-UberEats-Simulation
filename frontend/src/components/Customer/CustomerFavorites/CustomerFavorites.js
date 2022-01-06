import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '../CustomComponents/SlickComponent';
import { images } from '../../../constants';
import Navbar from '../../navbar';
import { getAllRestaurants } from '../../../state/action-creators/loginActions';

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
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  container: {
    marginTop: '140px',
  },
}));

const CustomerFavorites = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signInDetails = useSelector((state) => state.signIn.user);
  const loginDetails = useSelector((state) => state.login.user);
  const userType = loginDetails.userType || signInDetails.userType;
  const allRestaurants = useSelector((state) => state.login.allRestaurants);
  const allRestaurantMenu = useSelector((state) => state.login.allRestaurantMenu);

  const explore = [];

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const B = 5; // max size of 'cache'
  let N = 0;

  const chooseImage = () => {
    const num = Math.floor(Math.random() * images.length - N);
    N = Math.min(N + 1, B);
    const image = images.splice(num, 1);
    images.push(image);
    return image;
  };

  if (allRestaurants.length > 0) {
    allRestaurants.map((item) => {
      if (item.IsFavorite === 'true') {
        // const url = item.ImageUrl ? item.ImageUrl : chooseImage();
        const url = chooseImage();
        const data = { ...item, url };
        explore.push(data);
      }
      return true;
    });
  }

  return (
    <>
      <Navbar user={userType} />
      <Box component="div" className={classes.container}>
        <h1 className={classes.Header}>
          Your Favorites
        </h1>
        <hr />
        {allRestaurants.length > 0 && (
          <div>
            {explore.length > 0 && <Card title="Explore" data={explore} allRestaurantMenu={allRestaurantMenu} />}
          </div>
        )}
      </Box>
    </>
  );
};

export default CustomerFavorites;
