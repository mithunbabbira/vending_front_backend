import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantitySelection: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

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

  const handleConfirm = () => {
    // Here we'll add the logic to process the order
    console.log(`Ordering ${quantity} ${productId}`);
    // For now, we'll just go back to the main menu
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Select Quantity
        </Typography>
        
        <Typography variant="h6" gutterBottom align="center">
          {productId?.charAt(0).toUpperCase() + productId?.slice(1)}
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
            disabled={quantity <= 1}
            color="primary"
            size="large"
          >
            <RemoveIcon />
          </IconButton>

          <Typography variant="h3" component="div" sx={{ mx: 4 }}>
            {quantity}
          </Typography>

          <IconButton 
            onClick={handleIncrement}
            disabled={quantity >= 5}
            color="primary"
            size="large"
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleConfirm}
            size="large"
          >
            Confirm
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuantitySelection;
