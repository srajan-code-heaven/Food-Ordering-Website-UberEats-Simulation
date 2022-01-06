import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardActionArea,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  CardContent,
} from '@material-ui/core';
import { ColorButton3 } from '../../constants/index';
import { restaurantSignUp, customerSignUp } from '../../state/action-creators/signUpActions';
import Navbar from '../navbar';
import logo from '../../images/uber-eats-green.svg';

// CSS styles
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
  },
  container: {
    flexDirection: 'column !important',
    paddingTop: '2rem',
    height: '100vh',
  },
  card: {
    width: '40%',
    marginTop: '60px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    alignSelf: 'center',
    boxShadow: '6px 9px 10px',
    overflow: 'scroll',
  },
  cardActions: {
    justifyContent: 'center',
  },
  CardActionArea: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginBottom: '20px',
  },
  loginAnchor: {
    color: 'green',
    textDecoration: 'none',
    padding: '20px',
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const [user, setUser] = useState('Restaurant');
    const [profile, setProfile] = useState('general'); //eslint-disable-line
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('USA');
  const [city, setCity] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnChangeCountry = (event) => {
    setCountry(event);
  };

  const handleOnChangeCity = (event) => {
    setCity(event.target.value);
  };

  const onSignIn = (event) => {
    event.preventDefault();
    if (user === 'Restaurant') {
      dispatch(restaurantSignUp({
        RestaurantName: name,
        EmailId: email,
        RestaurantPassword: password,
        Country: country,
        City: city,
      }, history));
    } else {
      dispatch(customerSignUp({
        CustomerName: name,
        EmailId: email,
        CustomerPassword: password,
      }, history));
    }
  };

  return (
    <Box component="div" className={classes.mainContainer}>
      <Navbar user={profile} />
      <Grid container className={classes.container} justify="center">
        <Card className={classes.card}>
          <CardActionArea disableRipple className={classes.CardActionArea}>
            <img src={logo} width="120" height="80" alt="" />
            <FormControl component="fieldset">
              <RadioGroup row aria-label="user" name="row-radio-buttons-group" value={user} onChange={(e) => { setUser(e.target.value); }}>
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="Restaurant" control={<Radio />} label="Restaurant" />
              </RadioGroup>
            </FormControl>
            <CardContent>
              <TextField
                required
                id="resto_name"
                className={classes.textField}
                value={name}
                onChange={(e) => { handleOnChangeName(e); }}
                label="Name"
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                id="resto_email"
                className={classes.textField}
                value={email}
                onChange={(e) => { handleOnChangeEmail(e); }}
                label="Email"
                variant="outlined"
                fullWidth
              />
              {user === 'Restaurant' && (
              <>
                <TextField
                  fullWidth
                  variant="outlined"
                  className={classes.textField}
                  value={country}
                  onChange={(e) => handleOnChangeCountry(e.target.value)}
                  select
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                </TextField>
                <TextField
                  id="resto_city"
                  required
                  className={classes.textField}
                  value={city}
                  onChange={(e) => { handleOnChangeCity(e); }}
                  label="City"
                  variant="outlined"
                  fullWidth
                />
              </>
              )}
              <TextField
                id="resto_password"
                required
                className={classes.textField}
                value={password}
                onChange={(e) => { handleOnChangePassword(e); }}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <ColorButton3 variant="contained" onClick={(e) => { onSignIn(e); }}>
                Sign up
              </ColorButton3>
            </CardActions>
            <a href="/login" className={classes.loginAnchor}>Existing user? Login</a>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default SignUp;
