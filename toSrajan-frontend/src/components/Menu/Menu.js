/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
} from '@material-ui/core';
import NavBar from '../navbar.js';
import MenuCard from './MenuCard';
import { ColorButton3 } from '../../constants/index';
import { getRestaurantMenu } from '../../state/action-creators/restaurantMenuActions';
import AddEditMenu from './AddEditMenu';
import './MenuCard.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 20px 20px 21px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 20px 0',
    },
  },
}));

const Menu = () => {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.login.user);
  const menuDetails = useSelector((state) => state.menu.menu);

  const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false); //eslint-disable-line

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantMenu(userDetails.id, history));
  }, []);

  const handleClickOpen = (edit) => {
    setOpen(true);
    setIsEdit(edit);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBar user="restaurant" />
      <div style={{ margin: '10rem 3rem 4rem 3rem' }}>
        <div className={classes.header}>
          <h2 style={{ fontFamily: 'Galano Grotesque', alignSelf: 'center' }}>Restaurant Menu</h2>
          <ColorButton3
            variant="contained"
            color="primary"
            style={{ width: '8%' }}
            onClick={() => { handleClickOpen(false); }}
            className={classes.button}
          >
            Add
          </ColorButton3>
        </div>
        <Grid
          container-fluid={1}
          style={{
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {menuDetails.length > 0 && menuDetails.map((item, index) => <MenuCard key={`dish${index}`} menuDetails={item} isCustomer={false} />)}
          <div>
            <AddEditMenu
              open={open}
              isEdit={false}
              handleClose={handleClose}
            />
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Menu;
