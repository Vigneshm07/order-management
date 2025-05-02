import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Box, Grid, Typography, Card, CardContent, Divider,
  CircularProgress, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const HomePage = () => {
  const [salespersons, setSalespersons] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5055/salespersons')
      .then(response => {
        setSalespersons(response.data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching salespersons:', error);
        setLoading(false);  // Ensure loading is false in case of an error
      });
  }, []);

  const handleReportClick = () => {
    navigate('/report');
  };

  const handleEdit = (id) => {
    console.log(`Edit salesperson with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the salesperson and all linked customers and orders!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5055/salespersons/${id}`);
        setSalespersons(prev => prev.filter(sp => sp._id !== id));
        Swal.fire('Deleted!', 'Salesperson and related data have been deleted.', 'success');
      } catch (error) {
        console.error('Delete failed:', error);
        Swal.fire('Error', 'Something went wrong while deleting.', 'error');
      }
    }
  };

  const handleSalespersonClick = (id) => {
    navigate(`/salesperson/${id}`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#f5f7fa' }}>
      {/* Loader displayed while data is loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 5 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h4" gutterBottom>
                    Salespersons
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                      <TableRow>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Salesperson Name</TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>City</TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {salespersons.map((salesperson) => (
                        <TableRow key={salesperson._id} hover>
                          <TableCell
                            align="center"
                            sx={{ cursor: 'pointer', '&:hover': { color: '#1976d2', textDecoration: 'underline' } }}
                            onClick={() => handleSalespersonClick(salesperson._id)}
                          >
                            {salesperson.name}
                          </TableCell>
                          <TableCell align="center">{salesperson.city}</TableCell>
                          <TableCell align="center">
                            {/* <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleEdit(salesperson._id)}
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button> */}
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(salesperson._id)}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {salespersons.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No salespersons found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default HomePage;
