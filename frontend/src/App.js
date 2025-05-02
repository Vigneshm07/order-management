import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ReportPage from './Components/ReportPage';
import CustomerListPage from './Components/CustomerListPage';
import OrderPage from './Components/OrderPage';
import NavBar from './Components/Navbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/salesperson/:id" element={<CustomerListPage />} />
          <Route path="/customer/:customerId/orders" element={<OrderPage />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
};

export default App;
