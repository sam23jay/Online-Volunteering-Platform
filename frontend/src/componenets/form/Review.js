// Review.js
import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import '../Asset/CSS/Review.css';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="review-container">
      <div className="header">
        <Typography variant="h4" gutterBottom className="header-title">
          Perfume Palette
        </Typography>
      </div>

      <Typography variant="h5" gutterBottom className="review-title">
        Order Summary
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {['Products', 'Shipping', 'Payment'].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <List disablePadding>
          {products.map((product) => (
            <ListItem key={product.name} className="product-item">
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
          ))}
          <ListItem className="total-item">
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              $34.06
            </Typography>
          </ListItem>
        </List>
      )}

      {activeStep === 1 && (
        <Grid container spacing={2} className="details-section">
          <Grid item xs={12} sm={6} className="shipping-section">
            <Typography variant="h6" gutterBottom>
              Shipping
            </Typography>
            <Typography gutterBottom>John Smith</Typography>
            <Typography gutterBottom>{addresses.join(', ')}</Typography>
          </Grid>
        </Grid>
      )}

      {activeStep === 2 && (
        <Grid container spacing={2} className="details-section">
          <Grid item container direction="column" xs={12} sm={6} className="payment-section">
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Grid container>
              {payments.map((payment) => (
                <React.Fragment key={payment.name} className="payment-detail">
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}

      <div className="button-container">
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}
          <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
      </div>
    </div>
  );
}
