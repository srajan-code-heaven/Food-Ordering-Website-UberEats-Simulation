/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Grid,
} from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel';
import { LocationOn, FormatQuoteTwoTone } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../navbar.js';
import { ColorButton3 } from '../../constants/index';
import restoProfilePlaceholder from '../../images/restoProfilePlaceholder.jpeg';
import AddEditProfile from './AddEditProfile.js';
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
}));

const Profile = () => {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.login.user);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const imagesList = [
    { url: userDetails.image || restoProfilePlaceholder },
  ];
  const placeholder = ' N/A';
  const DeliveryMode = userDetails.Mode === 'Both' ? 'Delivery Available & Pickup' : userDetails.Mode;
  return (
    <>
      <NavBar user="restaurant" />
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
            <h3 className={classes.textFont}>{userDetails.name}</h3>
            <p className={classes.text} style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{userDetails.desc || 'N/A'}</p>
            <p>
              <LocationOn style={{ color: 'black' }} className={classes.textFont} />
              <b>
                {userDetails.city}
                ,
                {' '}
                {userDetails.state || 'N/A'}
                {' '}
                -
                {' '}
                {userDetails.pinCode || 'N/A'}
              </b>
            </p>
            <p className={classes.textFont}>
              Mail us at :
              <b><span style={{ color: '#7ac356' }} className={classes.textFont}>{userDetails.email || placeholder}</span></b>
            </p>
            <p className={classes.textFont}>
              We are one ring away :
              <b><span style={{ color: '#7ac356' }} className={classes.textFont}>{userDetails.phone || placeholder}</span></b>
            </p>
            <p className={classes.textFont}>
              Delivery Mode :
              <b><span style={{ color: '#7ac356' }} className={classes.textFont}>{DeliveryMode || placeholder}</span></b>
            </p>
            <ColorButton3
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen()}
              className={classes.button}
            >
              {' '}
              Update Profile
            </ColorButton3>
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
                  {userDetails.fromHrs || ' N/A'}
                  {' '}
                  AM /
                  {' '}
                  {userDetails.toHrs || ' N/A'}
                  {' '}
                  PM
                  {' '}
                </span>
              </b>
              of everyday.
              <br />
              * Please be courteous for other guests by arriving on time. :)
            </p>
          </div>
        </div>
        <div>
          <AddEditProfile
            open={open}
            handleClose={handleClose}
          />
        </div>
      </Grid>
    </>
  );
};

export default Profile;
