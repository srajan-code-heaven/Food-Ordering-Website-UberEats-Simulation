/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-expressions */
import React, {
  useEffect, useState, forwardRef, useImperativeHandle,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Input, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ColorButton3 } from '../../constants/index';
import dishPlaceholderImage from '../../images/dishPlaceholderImage.jpeg';
import server from '../../Config';
import { addRestaurantMenu, editRestaurantMenu } from '../../state/action-creators/restaurantMenuActions';

const AddEditMenu = (props, ref) => {
  const userDetails = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(props.isEdit ? (props.menuDetails.imageUrl || props.menuDetails.ImageUrl) : `${dishPlaceholderImage}`); //eslint-disable-line
  const [dishName, setDishName] = useState(props.isEdit ? props.menuDetails.DishName : '');
  const [dishType, setDishType] = useState(props.isEdit ? props.menuDetails.Category : '');
  const [dishCategory, setDishCategory] = useState(props.isEdit ? props.menuDetails.DishType : '');
  const [dishDescription, setDishDescription] = useState(props.isEdit ? props.menuDetails.DishDesc : '');
  const [dishPrice, setDishPrice] = useState(props.isEdit ? props.menuDetails.Price : '');

  const handleClear = () => {
    setImageUrl(props.isEdit ? (props.menuDetails.imageUrl || props.menuDetails.ImageUrl) : `${dishPlaceholderImage}`);
    setImage('');
    setDishName(props.isEdit ? props.menuDetails.DishName : '');
    setDishType(props.isEdit ? props.menuDetails.Category : '');
    setDishCategory(props.isEdit ? props.menuDetails.DishType : '');
    setDishDescription(props.isEdit ? props.menuDetails.DishDesc : '');
    setDishPrice(props.isEdit ? props.menuDetails.Price : '');
  };

  useEffect(() => {
    handleClear();
  }, []);

  useImperativeHandle(ref, () => ({
    initialize() {
      handleClear();
    },
  }));

  const onPhotoChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };
  const addNew = async (e) => {
    let response;
    e.preventDefault();
    if (image) {
      const imageData = new FormData();
      imageData.append('image', image);
      response = await axios.post(`${server}/fileUpload/image/dish`, imageData);
      setImageUrl(response.data.imageUrl);
    }
    const updatedData = {
      restaurantId: userDetails.id,
      dishdesc: dishDescription,
      category: dishType,
      price: dishPrice,
      name: dishName,
      type: dishCategory,
      imageUrl: response ? response.data.imageUrl : imageUrl,
    };
    dispatch(addRestaurantMenu(updatedData));
    props.handleClose();
    handleClear();
  };

  const editDish = async (event) => {
    event.preventDefault();
    let response;
    if (image) {
      const imageData = new FormData();
      imageData.append('image', image);
      response = await axios.post(`${server}/fileUpload/image/dish`, imageData);
      setImageUrl(response.data.imageUrl);
    }
    const updatedData = {
      restaurantId: userDetails.id,
      // eslint-disable-next-line no-underscore-dangle
      DishId: props.menuDetails._id,
      DishName: dishName,
      DishType: dishCategory,
      DishDesc: dishDescription,
      Category: dishType,
      Price: dishPrice,
      ImageUrl: response ? response.data.imageUrl : props.menuDetails.ImageUrl,
    };
    dispatch(editRestaurantMenu(updatedData));
    props.handleClose();
    handleClear();
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.handleClose();
        handleClear();
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add or Update Dish</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the dish details to include it in the menu.
        </DialogContentText>
        <label htmlFor="dish_image">
          <Input accept="image/*" style={{ display: 'none' }} id="dish_image" name="dish_image" required autoFocus type="file" onChange={onPhotoChange} />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          {image ? 'File Uploaded' : ''}
        </label>
        <TextField
          variant="outlined"
          required
          style={{ marginBottom: '20px' }}
          fullWidth
          type="text"
          id="dish_name"
          label="Name of the Dish"
          name="name"
          onChange={(e) => setDishName(e.target.value)}
          autoComplete="name"
          value={dishName}
          autoFocus
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          id="dish_desc"
          type="text"
          value={dishDescription}
          label="Description of the dish"
          name="desc"
          onChange={(e) => setDishDescription(e.target.value)}
          autoComplete="desc"
          multiline
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Select dish category"
          style={{ marginBottom: '20px' }}
          value={dishType}
          onChange={(e) => setDishType(e.target.value)}
          select
        >
          <MenuItem value="Vegan">Vegan</MenuItem>
          <MenuItem value="Non Vegetarian">Non Vegetarian</MenuItem>
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
        </TextField>
        <TextField
          fullWidth
          variant="outlined"
          label="Select dish type"
          style={{ marginBottom: '20px' }}
          value={dishCategory}
          onChange={(e) => setDishCategory(e.target.value)}
          select
        >
          <MenuItem value="Apetizer">Apetizer</MenuItem>
          <MenuItem value="Main Course">Main Course</MenuItem>
          <MenuItem value="Dessert">Dessert</MenuItem>
        </TextField>
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          id="dish_price"
          type="number"
          step="0.01"
          min={1}
          value={dishPrice}
          label="Price of the dish"
          name="price"
          onChange={(e) => setDishPrice(e.target.value)}
          autoComplete="price"
        />

      </DialogContent>
      <DialogActions>
        <ColorButton3
          variant="contained"
          onClick={(e) => {
            props.isEdit ? editDish(e) : addNew(e);
          }}
          color="primary"
        >
          Submit
        </ColorButton3>
      </DialogActions>
    </Dialog>
  );
};

AddEditMenu.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  isEdit: PropTypes.bool,
  handleClose: PropTypes.func,
  menuDetails: PropTypes.any,
};

export default forwardRef(AddEditMenu);
