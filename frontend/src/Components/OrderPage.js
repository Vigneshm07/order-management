import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box,
    Card, CardContent, Divider, CircularProgress
} from '@mui/material';
import BackButton from './BackButton';

const OrderPage = () => {
    const { customerId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        axios.get(`http://localhost:5055/customer/${customerId}/orders`)
            .then(response => {
                setOrders(response.data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setLoading(false); // Ensure loading is false in case of an error
            });
    }, [customerId]);

    // Calculate totals
    const totalAmount = orders.reduce((sum, order) => sum + order.orderAmt, 0);
    const totalOrders = orders.length;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            {/* Loader displayed while data is loading */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Card sx={{ width: '90%', maxWidth: 1000, boxShadow: 6, borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            Customer Orders
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                            <Table>
                                <TableHead sx={{ bgcolor: '#1976d2' }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Order Date</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Amount (₹)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order._id} hover>
                                            <TableCell align="center">{order._id}</TableCell>
                                            <TableCell align="center">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">₹{order.orderAmt.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                    {/* Summary row */}
                                    <TableRow sx={{ bgcolor: '#f1f1f1' }}>
                                        <TableCell align="center" colSpan={2}><strong>Total Orders:</strong> {totalOrders}</TableCell>
                                        <TableCell align="center"><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="center" mt={3}>
                            <BackButton />
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default OrderPage;
