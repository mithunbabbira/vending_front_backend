import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createOrder } from '../services/paymentService';

// Define product prices
const PRODUCT_PRICES: { [key: string]: number } = {
  popcorn: 20.00,
  coffee: 10.00,
  tea: 10.00,
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

const QuantitySelection: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productPrice = productId ? PRODUCT_PRICES[productId] : 0;
  const totalAmount = productPrice * quantity;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create order on backend
      const order = await createOrder(totalAmount);
      
      // Initialize Razorpay payment
      const options = {
        key: 'your_razorpay_key_id', // Replace with your actual key
        amount: order.amount,
        currency: order.currency,
        name: 'Vending Machine',
        description: `${quantity} x ${productId}`,
        order_id: order.id,
        prefill: {
          name: 'Customer',
        },
        handler: function (response: any) {
          console.log('Payment successful:', response);
          // Here you can handle successful payment
          // For example, dispense the product or show success message
          navigate('/success');
        },
        modal: {
          ondismiss: function () {
            console.log('Payment cancelled');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!productId || !PRODUCT_PRICES[productId]) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          Invalid product selected
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ color: 'primary.main' }}
        >
          Select Quantity
        </Typography>
        
        <Typography 
          variant="h6" 
          gutterBottom 
          align="center"
          sx={{ color: 'primary.dark' }}
        >
          {productId.charAt(0).toUpperCase() + productId.slice(1)}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            my: 4
          }}
        >
          <IconButton 
            onClick={handleDecrement}
            disabled={quantity <= 1 || loading}
            sx={{ 
              backgroundColor: 'primary.light',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
          
          <Typography variant="h4" sx={{ mx: 4, minWidth: '60px', textAlign: 'center' }}>
            {quantity}
          </Typography>
          
          <IconButton 
            onClick={handleIncrement}
            disabled={quantity >= 5 || loading}
            sx={{ 
              backgroundColor: 'primary.light',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom
          sx={{ color: 'secondary.main', fontWeight: 600 }}
        >
          Total: ₹{totalAmount.toFixed(2)}
        </Typography>

        {error && (
          <Typography 
            color="error" 
            align="center" 
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleConfirm}
            disabled={loading}
            sx={{
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px rgba(63, 81, 181, 0.3)',
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Pay ₹${totalAmount.toFixed(2)}`
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuantitySelection;
