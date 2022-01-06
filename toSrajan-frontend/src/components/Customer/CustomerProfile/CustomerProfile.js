import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Typography,
  Grid,
  Hidden,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UpdateProfile from './UpdateProfile';
import { ColorButton3 } from '../../../constants/index';
import image from '../../../images/pic.png';
import Navbar from '../../navbar';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '140px',
  },
  Header: {
    color: '#222',
    alignSelf: 'baseline',
    margin: '20px 10px',
    fontFamily: 'Galano Grotesque',
    [theme.breakpoints.down('md')]: {
      marginLeft: '10px',
      fontSize: '20px',
      fontWeight: 500,
    },
  },
  wrapper: {
    // background: '#7ac356',
    height: '100vh',
    width: '100vw',
    // border: '1px solid black',
    color: 'white',
  },
  subcontainer: {
    margin: '20px',
    background: '#222',
    boxSizing: 'border-box',
    height: '95vh',
    width: '97vw',
    boxShadow: '2px 2px 20px 2px black',
    [theme.breakpoints.down('sm')]: {
      width: '89vw',
      height: '94vh',
    },
    display: 'flex',
  },
  left: {
    height: '100%',
    width: '20%',
    background: '#7ac356', // '#E1AD01',
    color: '#222',
    // border: '1px solid #222'
  },
  right: {
    height: '100%',
    width: '80%',
    background: '#fafafa',
    color: '#222',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    margin: '130px 0px 50px 50px',
    position: 'absolute',
    width: '40%',
    height: '65%',
    boxShadow: '2px 2px 10px black',
    [theme.breakpoints.down('sm')]: {
      width: '35% !important',
      margin: '60px 0px 0px 30px',
      height: '25% !important',
    },
  },
  leftSub: {
    width: '20%',
  },
  rightSub: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  background: {
    backgroundColor: '#7ac356 !important',
  },
  cardContainer: {
    display: 'flex',
    height: '100%',
    margin: '0px 1rem 1rem 1rem',
    width: '97%',
    overflow: 'scroll',
  },
}));

const CustomerProfile = () => {
  const classes = useStyles();
  const location = useLocation();
  const signInDetails = useSelector((state) => state.signIn.user);
  const userDetails = useSelector((state) => state.login.user);
  const userType = userDetails.userType || signInDetails.userType;
  let profileDetails;
  if (location.state) {
    profileDetails = location.state.profileDetails;
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar user={userType} />
      <Grid container-fluid={1} className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.subcontainer}>
            <div className={classes.left}>
              {/* <img src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80' alt='' className={classes.image}/> */}
            </div>
            <div className={classes.right}>
              <div style={{
                height: '60px', width: '100%', display: 'flex', justifyContent: 'space-between',
              }}
              >
                <h1 className={classes.Header}>
                  Customer Profile
                </h1>
                {!profileDetails && (
                  <ColorButton3 variant="contained" style={{ marginRight: '10px', alignSelf: 'center', width: '40px' }} onClick={() => { handleClickOpen(); }}>
                    Modify
                  </ColorButton3>
                )}
              </div>
              <hr />
              <Hidden mdDown>
                <Card className={classes.cardContainer}>
                  <CardMedia
                    component="img"
                    style={{ width: '50%', height: '100%' }}
                    image={(profileDetails && profileDetails.ImageUrl)
                      || userDetails.image || image}
                    alt="Paella dish"
                  />
                  <CardContent style={{ width: '100%' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Name
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.name) || (profileDetails && profileDetails.CustomerName) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Date of Birth
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.dob) || (profileDetails && profileDetails.DateOfBirth) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Nick Name
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.nickname) || (profileDetails && profileDetails.NickName) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Email
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.email) || (profileDetails && profileDetails.EmailId)}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Phone
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.phone) || (profileDetails && profileDetails.PhoneNumber) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Address
                    </Typography>
                    <p>
                      {(userType === 'customer' && userDetails.street) || (profileDetails && profileDetails.Street) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.city) || (profileDetails && profileDetails.City) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.state) || (profileDetails && profileDetails.State) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.country) || (profileDetails && profileDetails.Country) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.pinCode) || (profileDetails && profileDetails.Pincode) || 'N/A'}
                    </p>
                    <hr />
                  </CardContent>
                </Card>
              </Hidden>
              <Hidden mdUp>
                <Card style={{ width: '90%', overflow: 'scroll' }}>
                  <CardMedia
                    component="img"
                    height="194"
                                    // style={{width: '50%', height: '100%'}}
                    image={(profileDetails && profileDetails.ImageUrl)
                      || userDetails.image || image}
                    alt="Paella dish"
                  />
                  <CardContent style={{ width: '100%' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Name
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.name) || (profileDetails && profileDetails.CustomerName) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Date of Birth
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.dob) || (profileDetails && profileDetails.DateOfBirth) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Nick Name
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.nickname) || (profileDetails && profileDetails.NickName) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Email
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.email) || (profileDetails && profileDetails.EmailId)}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Phone
                    </Typography>
                    <p>{(userType === 'customer' && userDetails.phone) || (profileDetails && profileDetails.PhoneNumber) || 'N/A'}</p>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">
                      Address
                    </Typography>
                    <p>
                      {(userType === 'customer' && userDetails.street) || (profileDetails && profileDetails.Street) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.city) || (profileDetails && profileDetails.City) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.state) || (profileDetails && profileDetails.State) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.country) || (profileDetails && profileDetails.Country) || 'N/A'}
                      {' '}
                      ,
                      {(userType === 'customer' && userDetails.pinCode) || (profileDetails && profileDetails.Pincode) || 'N/A'}
                    </p>
                    <hr />
                  </CardContent>
                </Card>
              </Hidden>
            </div>
          </div>
        </div>
      </Grid>
      <div>
        <UpdateProfile
          open={open}
          handleClose={handleClose}
        />
      </div>
    </>
  );
};

export default CustomerProfile;
