/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../../state/action-creators/loginActions';
import { ColorButton3 } from '../../../constants/index';

const AddAddress = (props) => {
  const userDetails = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [saveAsName, setSaveAsName] = useState('');

  const handleClear = () => {
    setAddressLine1('');
    setAddressLine2('');
    setCountry('');
    setState('');
    setPinCode('');
    setCity('');
    setSaveAsName('');
  };

  const addAddressDetails = () => {
    const address = {
      CustomerId: userDetails.id,
      AddressLine1: addressLine1,
      AddressLine2: addressLine2,
      State: state,
      Country: country,
      City: city,
      PinCode: pinCode,
      SaveAsName: saveAsName,
    };
    if ((addressLine1 || addressLine2) && state && country && city && pinCode && saveAsName) {
      dispatch(addAddress(address));
      props.handleClose();
      handleClear();
    } else {
      alert('Enter All the field details');
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Your Cart Details</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="text"
          id="saveAsName"
          label="Save As Name"
          value={saveAsName}
          name="saveAsName"
          onChange={(e) => setSaveAsName(e.target.value)}
          autoComplete="saveAsName"
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
          id="addressLine1"
          label="Address Line 1"
          name="Address Line 1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          autoComplete="addressLine1"
          autoFocus
        />
        <TextField
          variant="outlined"
          style={{ marginBottom: '20px' }}
          required
          fullWidth
          type="text"
          id="addressLine2"
          label="Address Line 2"
          name="Address Line 2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          autoComplete="addressLine2"
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
        <ColorButton3 variant="contained" onClick={() => { addAddressDetails(); }} color="primary">
          Add
        </ColorButton3>
      </DialogActions>
    </Dialog>
  );
};

AddAddress.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddAddress;
