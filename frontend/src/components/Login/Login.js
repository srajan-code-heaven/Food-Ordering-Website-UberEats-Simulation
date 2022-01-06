import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ColorButton3 } from '../../constants/index';
import { restaurantLogin, customerLogin } from '../../state/action-creators/loginActions';
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    alignSelf: 'center',
    boxShadow: '6px 9px 10px',
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

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState('Restaurant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onLogIn = () => {
    if (user === 'Restaurant') {
      dispatch(restaurantLogin({ EmailId: email, RestaurantPassword: password }, history));
    } else {
      dispatch(customerLogin({ EmailId: email, CustomerPassword: password }, history));
    }
  };

  return (
    <Box component="div" className={classes.mainContainer}>
      <Navbar user="general" />
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
                id="login_mail"
                className={classes.textField}
                value={email}
                onChange={(e) => {
                  handleOnChangeEmail(e);
                }}
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="log_password"
                type="password"
                value={password}
                onChange={(e) => {
                  handleOnChangePassword(e);
                }}
                label="Password"
                variant="outlined"
                fullWidth
              />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <ColorButton3 variant="contained" onClick={(e) => { onLogIn(e); }}>
                Login
              </ColorButton3>
            </CardActions>
            <a href="/" className={classes.loginAnchor}>New user? Register Here</a>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default Login;
