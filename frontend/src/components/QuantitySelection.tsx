import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createOrder } from '../services/paymentService';
import { THEME_COLORS } from '../theme/colors';

// Define product prices and timeout duration
const PRODUCT_PRICES: { [key: string]: number } = {
  popcorn: 20.00,
  coffee: 10.00,
  tea: 10.00,
};

const TIMEOUT_DURATION = 60; // seconds

const QuantitySelection: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_DURATION);

  const productPrice = productId ? PRODUCT_PRICES[productId] : 0;
  const totalAmount = productPrice * quantity;

  // Memoize navigation callback
  const navigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Optimize timer effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remaining = TIMEOUT_DURATION - elapsedSeconds;
      
      if (remaining <= 0) {
        clearInterval(timer);
        navigateHome();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(timer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigateHome]);

  const handleIncrement = () => {
    if (quantity < 5) setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleConfirm = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const order = await createOrder(totalAmount);
      
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Vending Machine',
        description: `${quantity} x ${productId}`,
        order_id: order.id,
        handler: function (response: any) {
          console.log('Payment successful:', response);
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            align="center" 
            gutterBottom
            sx={{ color: THEME_COLORS.secondary }}
          >
            Time Remaining: {timeLeft}s
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(timeLeft / TIMEOUT_DURATION) * 100}
            sx={{ 
              height: 8,
              backgroundColor: THEME_COLORS.lightBackground,
              '& .MuiLinearProgress-bar': {
                backgroundColor: THEME_COLORS.primary,
              }
            }}
          />
        </Box>

        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            backgroundColor: THEME_COLORS.background,
          }}
        >
          <Typography 
            variant="h4" 
            align="center"
            sx={{ color: THEME_COLORS.primary, mb: 3 }}
          >
            Select Quantity
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            my: 3
          }}>
            <IconButton 
              onClick={handleDecrement}
              disabled={quantity <= 1 || loading}
              sx={{ 
                bgcolor: THEME_COLORS.primary,
                color: 'white',
                '&:hover': { bgcolor: THEME_COLORS.accent }
              }}
            >
              <RemoveIcon />
            </IconButton>
            
            <Typography variant="h4" sx={{ width: 50, textAlign: 'center' }}>
              {quantity}
            </Typography>
            
            <IconButton 
              onClick={handleIncrement}
              disabled={quantity >= 5 || loading}
              sx={{ 
                bgcolor: THEME_COLORS.primary,
                color: 'white',
                '&:hover': { bgcolor: THEME_COLORS.accent }
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Typography 
            variant="h5" 
            align="center"
            sx={{ color: THEME_COLORS.accent, mb: 3 }}
          >
            Total: ₹{totalAmount.toFixed(2)}
          </Typography>

          {error && (
            <Typography 
              color="error" 
              align="center" 
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={navigateHome}
              disabled={loading}
              sx={{
                borderColor: THEME_COLORS.primary,
                color: THEME_COLORS.primary,
              }}
            >
              Cancel
            </Button>
            
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleConfirm}
              disabled={loading}
              sx={{
                bgcolor: THEME_COLORS.primary,
                '&:hover': { bgcolor: THEME_COLORS.accent }
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
      </Box>
    </Container>
  );
};

export default QuantitySelection;
