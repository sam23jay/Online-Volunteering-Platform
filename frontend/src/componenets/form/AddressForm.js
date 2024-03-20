import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container'; // Import Container from MUI
import '../Asset/CSS/AddressForm.css';
import { useNavigate } from 'react-router-dom';

export default function AddressForm() {
    const navigate=useNavigate();
    const handleNext=()=>{
        navigate('/out');
    }
    const handlePrevious=()=>{
        navigate('/');
    }
    
  return (
    <>
    <div className="app-container">
      <div className="app-bar">
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Your-Font-Here', fontSize: '28px' }}>
          Perfume Palette
        </Typography>
      </div>
      <Container maxWidth="sm"> {/* Use MUI Container */}
        <div className="center-container">
          <div className="address-form">
            <Typography variant="h5" gutterBottom>
              Shipping address
            </Typography>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
            <TextField
              required
              id="address2"
              name="address2"
              label="Mobile Number"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
                        


          </div>
        </div>
      </Container>
      
    </div>
      
      </>
  );
}
