import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { THEME_COLORS } from '../theme/colors';

interface Product {
  id: string;
  name: string;
  price: number;
  icon: any;
}

const products: Product[] = [
  {
    id: 'popcorn',
    name: 'Popcorn',
    price: 20.00,
    icon: RestaurantIcon,
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 10.00,
    icon: LocalCafeIcon,
  },
  {
    id: 'tea',
    name: 'Tea',
    price: 10.00,
    icon: EmojiFoodBeverageIcon,
  },
];

const ProductSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleProductSelect = useCallback((productId: string) => {
    navigate(`/quantity/${productId}`);
  }, [navigate]);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        bgcolor: THEME_COLORS.background,
        minHeight: '100vh',
      }}
    >
      <Typography 
        variant="h2" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          color: THEME_COLORS.primary,
          fontWeight: 600,
          mb: 4,
        }}
      >
        Select Your Product
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                onClick={() => handleProductSelect(product.id)}
                sx={{ 
                  height: '100%',
                  bgcolor: THEME_COLORS.background,
                  cursor: 'pointer',
                  border: `1px solid ${THEME_COLORS.lightBackground}`,
                }}
              >
                <CardContent sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 4,
                }}>
                  <Icon 
                    sx={{ 
                      fontSize: 64,
                      color: THEME_COLORS.primary,
                      mb: 2,
                    }} 
                  />
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      color: THEME_COLORS.secondary,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      color: THEME_COLORS.accent,
                    }}
                  >
                    ₹{product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProductSelection;
