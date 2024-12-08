import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ProductSelection from './components/ProductSelection';
import QuantitySelection from './components/QuantitySelection';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ProductSelection />} />
          <Route path="/quantity/:productId" element={<QuantitySelection />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
