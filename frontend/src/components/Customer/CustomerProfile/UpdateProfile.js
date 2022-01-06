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
import { updateCustomer } from '../../../state/action-creators/loginActions';
import server from '../../../Config';
import restoProfilePlaceholder from '../../../images/restoProfilePlaceholder.jpeg';
import { ColorButton3 } from '../../../constants/index';

const UpdateProfile = (props) => {
  const userDetails = useSelector((state) => state.login.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState(`${restoProfilePlaceholder}`); //eslint-disable-line
  const [customerName, setCustomerName] = useState(userDetails.name);
  const [nickName, setCustomerNickName] = useState(userDetails.nickname);
  const [street, setStreet] = useState(userDetails.street);
  const [country, setCountry] = useState(userDetails.country);
  const [state, setState] = useState(userDetails.state);
  const [pinCode, setPinCode] = useState(userDetails.pinCode);
  const [dob, setDob] = useState(userDetails.dob);
  const [city, setCity] = useState(userDetails.city);
  const [phone, setPhone] = useState(userDetails.phone);

  const onPhotoChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
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
      customerId: userDetails.id,
      name: customerName,
      nickname: nickName,
      street,
      dob,
      country,
      state,
      pincode: pinCode,
      city,
      phone,
      imageUrl: response ? response.data.imageUrl : userDetails.image,
    };
    dispatch(updateCustomer(updatedData, history));
    props.handleClose();
    // handleClear();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
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
          label="Name"
          name="name"
          onChange={(e) => setCustomerName(e.target.value)}
          autoComplete="name"
          value={customerName}
          autoFocus
        />
        <TextField
          variant="outlined"
          required
          style={{ marginBottom: '20px' }}
          fullWidth
          type="text"
          id="nickname"
          label="Nick Name"
          name="nickname"
          onChange={(e) => setCustomerNickName(e.target.value)}
          autoComplete="nickname"
          value={nickName}
          autoFocus
        />
        <TextField
          variant="outlined"
          required
          style={{ marginBottom: '20px' }}
          fullWidth
          type="date"
          id="dob"
                        // label="Date of Birth"
          name="dob"
          onChange={(e) => setDob(e.target.value)}
          autoComplete="dob"
          value={dob}
          autoFocus
        />
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
          id="street"
          label="Street"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          autoComplete="street"
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

UpdateProfile.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default UpdateProfile;
