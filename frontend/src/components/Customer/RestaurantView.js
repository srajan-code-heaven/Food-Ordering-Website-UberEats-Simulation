/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { LocationOn, FormatQuoteTwoTone, ArrowDownwardOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../navbar.js';
import restoProfilePlaceholder from '../../images/restoProfilePlaceholder.jpeg';
import MenuCard from '../Menu/MenuCard';
import '../styles.css';

// CSS styles
const useStyles = makeStyles((theme) => ({
  wrap: {
    marginTop: '74px',
  },
  parent: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'ceter',
    },
    width: '100%',
    marginTop: '2rem',
    justifyContent: 'center',
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  left: {
    width: '50%',
    margin: '20px 0px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      margin: '20px 20px',
    },
  },
  right: {
    width: '50%',
    margin: '20px 0px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      margin: '20px 20px',
    },
  },
  textFont: {
    fontFamily: 'Galano Grotesque',
  },
  button: {
    margin: theme.spacing(1),
    width: '20%',
    fontFamily: 'Galano Grotesque',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    marginLeft: 0,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  filterWrapper: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    display: 'flex',
    justifyContent: 'space-around',
  },
  filter: {
    marginBottom: '20px',
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    },
  },
}));

const RestaurantView = () => {
  const classes = useStyles();
  const location = useLocation();
  // const userDetails = useSelector((state) => state.login.user);
  const [dishType, setDishType] = useState('');
  const [dishCategory, setDishCategory] = useState('');
  const imagesList = [
    { url: restoProfilePlaceholder || location.state.restoDetails.ImageUrl},
  ];

  const placeholder = ' N/A';

  let filteredData1 = [];
  let filteredData2 = [];
  let finalData = [];

  if (location.state.dishes.length > 0) {
    if (dishType === 'All' || !dishType) {
      filteredData1 = location.state.dishes;
    } else {
      filteredData1 = [];
      location.state.dishes.map((item) => {
        if (item.DishType === dishType) {
          filteredData1.push(item);
        }
        return true;
      });
    }
  }

  if (location.state.dishes.length > 0) {
    if (dishCategory === 'All' || !dishCategory) {
      filteredData2 = location.state.dishes;
    } else {
      filteredData2 = [];
      location.state.dishes.map((item) => {
        if (item.Category === dishCategory) {
          filteredData2.push(item);
        }
        return true;
      });
    }
  }
  const buffer = filteredData1.concat(filteredData2);
  finalData = buffer.filter((item, pos) => buffer.indexOf(item) !== pos);
  return (
    <>
      <NavBar user="customer" />
      <Grid container-fluid={1} className={classes.wrap}>
        <Carousel>
          {imagesList.map((item, index) => (
            <Carousel.Item key={`carouselItem${index}`} style={{ height: '70vh', transition: 'transform 0.3s ease-in-out left !important' }}>
              <img
                style={{ height: '70vh' }}
                className="d-block w-100"
                src={item.url}
                alt=""
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={classes.parent}>
          <div className={classes.left}>
            <h3 className={classes.textFont}>{location.state.restoDetails.RestaurantName}</h3>
            <p className={classes.text} style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{location.state.restoDetails.RestaurantDesc || 'N/A'}</p>
            <p>
              <LocationOn style={{ color: 'black' }} className={classes.textFont} />
              <b>
                {location.state.restoDetails.City}
                ,
                {' '}
                {location.state.restoDetails.State || 'N/A'}
                {' '}
                -
                {' '}
                {location.state.restoDetails.Pincode || 'N/A'}
              </b>
            </p>
            <p className={classes.textFont}>
              Mail us at :
              <b><span style={{ color: '#7ac356' }} className={classes.textFont}>{location.state.restoDetails.EmailId || placeholder}</span></b>
            </p>
            <p className={classes.textFont}>
              We are one ring away :
              <b><span style={{ color: '#7ac356' }} className={classes.textFont}>{location.state.restoDetails.PhoneNumber || placeholder}</span></b>
            </p>
            <p className={classes.textFont}>
              Delivery Mode :
              <b><span style={{ color: '#7ac356' }} className={classes.textFont}>{location.state.restoDetails.Mode || placeholder}</span></b>
            </p>
          </div>
          <div className={classes.right}>
            <h2 className={classes.text} style={{ fontFamily: 'Galano Grotesque' }}>Remember that feeling of meeting friends after a long travel?</h2>
            <p className={classes.text} style={{ fontFamily: 'Galano Grotesque', fontSize: '14px' }}>
              A little nervousness and excitement at the same time.
              <FormatQuoteTwoTone> </FormatQuoteTwoTone>
              <br />
              Cannot wait to hear stories and see their smiles.
              <br />
              All the guests will start dinner together at
              {' '}
              <b>
                <span style={{ color: '#7ac356' }}>
                  {location.state.restoDetails.WorkHrsFrom || ' N/A'}
                  {' '}
                  /
                  {' '}
                  {location.state.restoDetails.WorkHrsTo || ' N/A'}
                  {' '}
                </span>
              </b>
              of everyday.
              <br />
              * Please be courteous for other guests by arriving on time. :)
            </p>
            <Button
              onClick={() => {
                document.getElementById('restaurantMenuData').scrollIntoView();
              }}
              style={{ color: 'green', fontWeight: 'bold', border: '1px solid black' }}
            >
              CLICK TO SEE OUR MENU
              {' '}
              <ArrowDownwardOutlined />
            </Button>
          </div>
        </div>
        <hr />
        <div id="restaurantMenuData">
          <div className={classes.wrapper}>
            <h3 className={classes.left}>Our Menu</h3>
            <div className={classes.filterWrapper}>
              <TextField
                                // variant='outlined'
                label="Filter by Dish type"
                className={classes.filter}
                value={dishType}
                onChange={(e) => setDishType(e.target.value)}
                select
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Apetizer">Apetizer</MenuItem>
                <MenuItem value="Main Course">Main Course</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
              </TextField>
              <TextField
                                // variant='outlined'
                label="Filter by Dish Category"
                className={classes.filter}
                value={dishCategory}
                onChange={(e) => setDishCategory(e.target.value)}
                select
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Non Vegetarian">Non Vegetarian</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              </TextField>
            </div>
          </div>
          <div style={{ margin: '1rem 3rem 4rem 3rem' }}>
            <Grid
              container-fluid={1}
              style={{
                overflow: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {finalData.map((item, index) => <MenuCard key={`dish${index}`} menuDetails={item} isCustomer />)}
            </Grid>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default RestaurantView;
