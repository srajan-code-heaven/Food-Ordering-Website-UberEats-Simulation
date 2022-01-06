/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Input,
  IconButton,
} from '@material-ui/core';
import {
  PhotoCamera,
} from '@material-ui/icons';
import { updateRestaurant } from '../../state/action-creators/loginActions';
import server from '../../Config';
import restoProfilePlaceholder from '../../images/restoProfilePlaceholder.jpeg';
import { ColorButton3 } from '../../constants/index';

const AddEditProfile = (props) => {
  const userDetails = useSelector((state) => state.login.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState(userDetails.imageUrl || userDetails.image || `${restoProfilePlaceholder}`); //eslint-disable-line
  const [restaurantName, setRestaurantName] = useState(userDetails.name);
  const [fromHrs, setFromHrs] = useState(userDetails.fromHrs);
  const [toHrs, setToHrs] = useState(userDetails.toHrs);
  const [country, setCountry] = useState(userDetails.country);
  const [state, setState] = useState(userDetails.state);
  const [pinCode, setPinCode] = useState(userDetails.pinCode);
  const [city, setCity] = useState(userDetails.city);
  const [phone, setPhone] = useState(userDetails.phone);
  const [mode, setMode] = useState(userDetails.Mode);
  const [restaurantDescription, setRestaurantDescription] = useState(userDetails.desc);

  const onPhotoChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setImage('');
    setImageUrl(`${restoProfilePlaceholder}`);
    setRestaurantName(userDetails.name);
    setFromHrs(userDetails.fromHrs);
    setToHrs(userDetails.toHrs);
    setCountry(userDetails.country);
    setState(userDetails.state);
    setPinCode(userDetails.pinCode);
    setCity(userDetails.city);
    setPhone(userDetails.phone);
    setMode(userDetails.Mode);
    setRestaurantDescription(userDetails.desc);
    props.handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (image) {
      const imageData = new FormData();
      imageData.append('image', image);
      response = await axios.post(`${server}/fileUpload/image/restaurant`, imageData);
      setImageUrl(response.data.imageUrl);
    }
    const updatedData = {
      restaurantId: userDetails.id,
      name: restaurantName,
      desc: restaurantDescription,
      country,
      state,
      pincode: pinCode,
      city,
      mode,
      fromHrs,
      toHrs,
      phone,
      imageUrl: response ? response.data.imageUrl : userDetails.image,
    };
    dispatch(updateRestaurant(updatedData, history));
    handleReset();
  };

  return (
    <Dialog open={props.open} onClose={handleReset} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add or Edit Profile details</DialogTitle>
      <DialogContent>
        <label htmlFor="image">
          <Input accept="image/*" style={{ display: 'none' }} id="image" name="image" required autoFocus type="file" onChange={onPhotoChange} />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          {image && 'File Uploaded'}
        </label>
        <TextField
          variant="outlined"
          required
          style={{ marginBottom: '20px' }}
          fullWidth
          type="text"
          id="name"
          label="Name of the Restaurant"
          name="name"
          onChange={(e) => setRestaurantName(e.target.value)}
          autoComplete="name"
          value={restaurantName}
          autoFocus
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          id="desc"
          type="text"
          value={restaurantDescription}
          label="Description your restaurant"
          name="desc"
          onChange={(e) => setRestaurantDescription(e.target.value)}
          autoComplete="desc"
          autoFocus
          multiline
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="time"
          id="from"
          label="Work Hrs from"
          name="fromHrs"
                        // defaultValue="07:30"
          autoComplete="type"
          onChange={(e) => setFromHrs(e.target.value)}
          autoFocus
          value={fromHrs}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="time"
          id="to"
          label="Work Hrs to"
          name="toHrs"
          value={toHrs}
          autoComplete="to"
          onChange={(e) => setToHrs(e.target.value)}
                        // defaultValue="07:30 PM"
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          fullWidth
          label="Delivery Mode"
          variant="outlined"
          style={{ marginBottom: '20px' }}
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          select
        >
          <MenuItem value="Delivery Available">Delivery Available</MenuItem>
          <MenuItem value="Pick up">Pick up</MenuItem>
          <MenuItem value="Both">Delivery & Pick up</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Country"
          variant="outlined"
          style={{ marginBottom: '20px' }}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          select
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="India">India</MenuItem>
        </TextField>
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="text"
          id="state"
          label="State"
          value={state}
          name="state"
          onChange={(e) => setState(e.target.value)}
          autoComplete="state"
          autoFocus
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="text"
          id="city"
          label="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="city"
          autoFocus
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="text"
          id="phone"
          label="Phone Number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="phone"
          autoFocus
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="text"
          id="pin"
          label="Pin Code"
          name="pincode"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          autoComplete="pincode"
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <ColorButton3 variant="contained" color="primary" onClick={(e) => { handleSubmit(e); }}>
          Submit
        </ColorButton3>
      </DialogActions>
    </Dialog>
  );
};

AddEditProfile.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddEditProfile;
