import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import ProductSelection from './components/ProductSelection';
import QuantitySelection from './components/QuantitySelection';
import './App.css';

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
