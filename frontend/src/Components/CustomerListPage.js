import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Grid,
  Typography, Card, CardContent, Divider,
  CircularProgress
} from '@mui/material';
import BackButton from './BackButton';

const CustomerListPage = () => {
  const { id } = useParams(); // salespersonId
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5055/customers/salesperson/${id}`)
      .then(response => {
        setCustomers(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setLoading(false); // Ensure loading is false in case of an error
      });
  }, [id]);

  const handleCustomerClick = (customerId) => {
    navigate(`/customer/${customerId}/orders`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#f9fafc' }}>
      {/* Loader displayed while data is loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  Customers Linked to Salesperson
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                      <TableRow>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>City</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer._id}>
                          <TableCell
                            align="center"
                            sx={{ cursor: 'pointer', '&:hover': { color: '#1976d2', textDecoration: 'underline' } }}
                            onClick={() => handleCustomerClick(customer._id)}
                          >
                            {customer.name}
                          </TableCell>
                          <TableCell align="center">{customer.city}</TableCell>
                        </TableRow>
                      ))}
                      {customers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2} align="center">
                            No customers found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={3}>
                  <BackButton />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CustomerListPage;
