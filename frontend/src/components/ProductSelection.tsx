import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography, 
  Container, 
  Button,
  Box,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

const products: Product[] = [
  {
    id: 'popcorn',
    name: 'Popcorn',
    image: '/popcorn.jpg', // We'll add these images later
    price: 20.00
  },
  {
    id: 'coffee',
    name: 'Coffee',
    image: '/coffee.jpeg',
    price: 10.00
  },
  {
    id: 'tea',
    name: 'Tea',
    image: '/tea.jpg',
    price: 10.00
  }
];

const ProductSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleProductSelect = (productId: string) => {
    navigate(`/quantity/${productId}`);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%)',
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center"
          sx={{
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #3f51b5, #757de8)',
              borderRadius: '2px'
            }
          }}
        >
          Select Your Product
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.1)',
                    }
                  }
                }}
                onClick={() => handleProductSelect(product.id)}
              >
                <Box 
                  sx={{ 
                    width: '100%',
                    height: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    overflow: 'hidden',
                    padding: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                </Box>
                <CardContent 
                  sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.dark',
                      mb: 1
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'secondary.main',
                      fontWeight: 600,
                      mb: 3
                    }}
                  >
                    ₹{product.price.toFixed(2)}
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      mt: 'auto',
                      py: 1.5,
                      fontSize: '1.1rem'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductSelect(product.id);
                    }}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductSelection;
