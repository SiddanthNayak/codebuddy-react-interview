import React from 'react';
import TextField from '@mui/material/TextField';

const FormTwo = ({ firstName, lastName, address, formData, setFormData }) => (
  <div>
    <TextField
      className="my-3"
      label="First Name"
      value={firstName}
      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
      required
      inputProps={{
        pattern: '[a-zA-Z]{2,50}',
      }}
    />
    <br />
    <TextField
      className="my-3"
      label="Last Name"
      value={lastName}
      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
      inputProps={{
        pattern: '^[a-zA-Z]*$',
      }}
    />
    <br />
    <TextField
      className="my-3"
      label="Address"
      value={address}
      onChange={e => setFormData({ ...formData, address: e.target.value })}
      required
      inputProps={{
        minLength: 10,
      }}
    />
  </div>
);

export default FormTwo;
