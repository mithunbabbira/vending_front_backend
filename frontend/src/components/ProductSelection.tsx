import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Container, Button } from '@mui/material';
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
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
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => handleProductSelect(product.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {product.name}
                </Typography>
                <Typography variant="h6" color="primary" align="center">
                  ₹{product.price.toFixed(2)}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => handleProductSelect(product.id)}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductSelection;
