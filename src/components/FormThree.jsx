import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

const FormTwo = ({ countryCode, phoneNumber, formData, setFormData, acceptTnC, setAcceptTnC }) => (
  <div>
    <FormControl fullWidth className="my-3" required>
      <InputLabel>Country Code</InputLabel>
      <Select
        value={countryCode}
        onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
      >
        <MenuItem value="+91">India (+91)</MenuItem>
        <MenuItem value="+1">America (+1)</MenuItem>
      </Select>
    </FormControl>
    <br />
    <TextField
      fullWidth
      className="my-3"
      label="Phone Number"
      value={phoneNumber}
      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
      required
      inputProps={{
        pattern: 'd{10}',
      }}
    />
    <br />
    <FormControlLabel
      className="my-3"
      control={
        <Checkbox checked={acceptTnC} onChange={e => setAcceptTnC(e.target.checked)} required />
      }
      label="Accept Terms and Conditions"
    />
  </div>
);

export default FormTwo;
