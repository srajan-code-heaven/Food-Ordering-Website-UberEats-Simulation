import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Hidden, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../CustomComponents/SlickComponent';
import { images } from '../../../constants';
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
  filter: {
    marginBottom: '20px',
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '55%',
    },
  },
}));

const CustomerDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login.user);
  const allRestaurants = useSelector((state) => state.login.allRestaurants);
  const allRestaurantMenu = useSelector((state) => state.login.allRestaurantMenu);

  const [deliveryType, setDeliveryType] = useState('All');
  const searchString = useSelector((state) => state.login.searchString);

  const explore = [];
  const locationRelative = [];
  let searchResults = [];

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
      if (deliveryType === 'All') {
        // const url = item.ImageUrl || chooseImage();
        const url = chooseImage();
        const data = { ...item, url };
        explore.push(data);
      } else if (deliveryType === 'Delivery Available') {
        if (item.Mode === 'Delivery Available') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          explore.push(data);
        }
        if (item.Mode === 'Both') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          explore.push(data);
        }
      } else if (deliveryType === 'Pick up') {
        if (item.Mode === 'Pick up') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          explore.push(data);
        }
        if (item.Mode === 'Both') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          explore.push(data);
        }
      } else if (deliveryType === 'Both') {
        if (item.Mode === 'Both') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          explore.push(data);
        }
      }
      return true;
    });
    allRestaurants.map((item) => {
      const restoCity = item.City && item.City.replace(/\s/g, '').toLowerCase();
      const userCity = userDetails.city && userDetails.city.replace(/\s/g, '').toLowerCase();
      if (restoCity === userCity) {
        if (deliveryType === 'All') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          locationRelative.push(data);
        } else if (deliveryType === 'Delivery Available') {
          if (item.Mode === 'Delivery Available') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            locationRelative.push(data);
          }
          if (item.Mode === 'Both') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            locationRelative.push(data);
          }
        } else if (deliveryType === 'Pick up') {
          if (item.Mode === 'Pick up') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            locationRelative.push(data);
          }
          if (item.Mode === 'Both') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            locationRelative.push(data);
          }
        } else if (deliveryType === 'Both') {
          if (item.Mode === 'Both') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            locationRelative.push(data);
          }
        }
      }
      return true;
    });
    allRestaurants.map((item) => {
      if (searchString && (item.RestaurantName.toLowerCase().includes(searchString.toLowerCase())
            || item.City.toLowerCase().includes(searchString.toLowerCase()))) {
        if (deliveryType === 'All') {
          // const url = item.ImageUrl || chooseImage();
          const url = chooseImage();
          const data = { ...item, url };
          searchResults.push(data);
        } else if (deliveryType === 'Delivery Available') {
          if (item.Mode === 'Delivery Available') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            searchResults.push(data);
          }
          if (item.Mode === 'Both') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            searchResults.push(data);
          }
        } else if (deliveryType === 'Pick up') {
          if (item.Mode === 'Pick up') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            searchResults.push(data);
          }
          if (item.Mode === 'Both') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            searchResults.push(data);
          }
        } else if (deliveryType === 'Both') {
          if (item.Mode === 'Both') {
            // const url = item.ImageUrl || chooseImage();
            const url = chooseImage();
            const data = { ...item, url };
            searchResults.push(data);
          }
        }
      }
      return true;
    });
    if (allRestaurantMenu.length > 0) {
      allRestaurantMenu.map((item) => {
        if (searchString && item.DishName.toLowerCase().includes(searchString.toLowerCase())) {
          const found = searchResults.some((el) => el.RestaurantId === item.RestaurantId);
          if (!found) {
            allRestaurants.map((all) => {
              if (all.RestaurantId === item.RestaurantId) {
                if (deliveryType === 'All') {
                  // const url = item.ImageUrl || chooseImage();
                  const url = chooseImage();
                  const data = { ...all, url };
                  searchResults.push(data);
                } else if (deliveryType === 'Delivery Available') {
                  if (all.Mode === 'Delivery Available') {
                    // const url = item.ImageUrl || chooseImage();
                    const url = chooseImage();
                    const data = { ...all, url };
                    searchResults.push(data);
                  }
                  if (all.Mode === 'Both') {
                    // const url = item.ImageUrl || chooseImage();
                    const url = chooseImage();
                    const data = { ...all, url };
                    searchResults.push(data);
                  }
                } else if (deliveryType === 'Pick up') {
                  if (all.Mode === 'Pick up') {
                    // const url = item.ImageUrl || chooseImage();
                    const url = chooseImage();
                    const data = { ...all, url };
                    searchResults.push(data);
                  }
                  if (all.Mode === 'Both') {
                    // const url = item.ImageUrl || chooseImage();
                    const url = chooseImage();
                    const data = { ...all, url };
                    searchResults.push(data);
                  }
                } else if (deliveryType === 'Both') {
                  if (all.Mode === 'Both') {
                    // const url = item.ImageUrl || chooseImage();
                    const url = chooseImage();
                    const data = { ...all, url };
                    searchResults.push(data);
                  }
                }
              }
              return true;
            });
          }
        }
        return true;
      });
    }
    if (!searchString) {
      searchResults = [];
    }
  }

  return (
    <Box component="div" className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 10px 0 10px' }}>
        <h1 className={classes.Header}>
          Customer Dashboard
        </h1>
        <Hidden mdDown>
          <TextField
            variant="outlined"
            label="Filter by Delivery type"
            className={classes.filter}
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            select
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Delivery Available">Delivery Available</MenuItem>
            <MenuItem value="Pick up">Pick up</MenuItem>
            <MenuItem value="Both">Delivery & Pick up</MenuItem>
          </TextField>
        </Hidden>
        <Hidden mdUp>
          <TextField
                        // variant='outlined'
            label="Filter by Delivery type"
            className={classes.filter}
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            select
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Delivery Available">Delivery Available</MenuItem>
            <MenuItem value="Pick up">Pick up</MenuItem>
            <MenuItem value="Both">Delivery & Pick up</MenuItem>
          </TextField>
        </Hidden>
      </div>
      <hr />
      {allRestaurants.length > 0 && (
      <div>
        {searchResults.length > 0 && <Card title={`Search Results for '${searchString}'`} data={searchResults} allRestaurantMenu={allRestaurantMenu} />}
        {locationRelative.length > 0 && <Card title="Trending in your location" data={locationRelative} allRestaurantMenu={allRestaurantMenu} />}
        {explore.length > 0 && <Card title="Explore All Restaurants" data={explore} allRestaurantMenu={allRestaurantMenu} />}
      </div>
      )}
    </Box>
  );
};
CustomerDashboard.propTypes = {
  // ...prop type definitions here
  // searchString: PropTypes.any,
};
export default CustomerDashboard;
