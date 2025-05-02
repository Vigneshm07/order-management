import React, { useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Grid, CircularProgress, FormControlLabel, Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';

const Reports = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    customerName: false,
    customerCity: false,
    salespersonName: false,
    salespersonCity: false
  });

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleSubmit = async () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    setShowTable(false);
    try {
      const response = await axios.get('http://localhost:5055/reports/orders', {
        params: {
          from: fromDate.toISOString(),
          to: toDate.toISOString()
        }
      });
      setOrders(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Order Reports
      </Typography>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={3}>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue);
              if (toDate && dayjs(newValue).isAfter(toDate)) {
                setToDate(null);
              }
            }}
            disableFuture
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={setToDate}
            disableFuture
            minDate={fromDate || undefined}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Box display="flex" gap={2} mb={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleColumns.customerName}
              onChange={() => handleColumnToggle('customerName')}
            />
          }
          label="Customer Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleColumns.customerCity}
              onChange={() => handleColumnToggle('customerCity')}
            />
          }
          label="Customer City"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleColumns.salespersonName}
              onChange={() => handleColumnToggle('salespersonName')}
            />
          }
          label="Salesperson Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleColumns.salespersonCity}
              onChange={() => handleColumnToggle('salespersonCity')}
            />
          }
          label="Salesperson City"
        />
      </Box>

      {loading ? (
        <Box height="60vh" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={60} />
        </Box>
      ) : (
        showTable && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order #</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount (₹)</TableCell>
                  {visibleColumns.customerName && (
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer Name</TableCell>
                  )}
                  {visibleColumns.customerCity && (
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer City</TableCell>
                  )}
                  {visibleColumns.salespersonName && (
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Salesperson Name</TableCell>
                  )}
                  {visibleColumns.salespersonCity && (
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Salesperson City</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.orderNumber}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{dayjs(order.date).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>₹ {order.amount ?? 'N/A'}</TableCell>
                    {visibleColumns.customerName && (
                      <TableCell>{order.customerName}</TableCell>
                    )}
                    {visibleColumns.customerCity && (
                      <TableCell>{order.customerCity}</TableCell>
                    )}
                    {visibleColumns.salespersonName && (
                      <TableCell>{order.salespersonName}</TableCell>
                    )}
                    {visibleColumns.salespersonCity && (
                      <TableCell>{order.salespersonCity}</TableCell>
                    )}
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </Box>
  );
};

export default Reports;
