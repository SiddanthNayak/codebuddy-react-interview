import React from 'react';
import TextField from '@mui/material/TextField';

const FormOne = ({ emailId, password, setFormData, formData }) => (
  <div>
    <TextField
      className="my-3"
      label="Email ID"
      value={emailId}
      onChange={e => setFormData({ ...formData, emailId: e.target.value })}
      required
      type="email"
    />
    <br />
    <TextField
      label="Password"
      className="my-3"
      value={password}
      onChange={e => setFormData({ ...formData, password: e.target.value })}
      required
      type="password"
    />
  </div>
);

export default FormOne;
