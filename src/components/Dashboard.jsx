import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, CircularProgress, Chip, Paper } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CodeIcon from '@mui/icons-material/Code';
import { useAuth } from '../AuthContext';
import { fetchDashboardData } from '../api';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDashboardData(token);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      }
    };
    loadData();
  }, [token]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Box p={5} textAlign="center"><CircularProgress color="secondary" /></Box>;

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Protected Route: Requires a valid JWT.
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" color="text.secondary">Auth Context</Typography>
              <SecurityIcon sx={{ color: 'success.main', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" color="white" mb={1}>{user?.name}</Typography>
            <Chip label={data.securityContext} color="success" size="small" sx={{ mb: 2 }} />
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">Granted Authorities:</Typography>
              {user?.roles.map(role => (
                <Chip key={role} label={role} color="primary" variant="outlined" size="small" sx={{ mt: 1, mr: 1 }} />
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, height: '100%', bgcolor: 'rgba(14, 165, 233, 0.05)' }}>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h6" color="text.secondary">JWT Payload & Filter Chain</Typography>
              <CodeIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
            </Box>
            <Typography variant="body1" color="secondary.light" mb={3} sx={{ fontFamily: 'monospace', bgcolor: 'rgba(0,0,0,0.3)', p: 2, borderRadius: 2 }}>
              {data.jwtFilterStatus}
            </Typography>
            <Paper sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.5)', fontFamily: 'monospace', color: '#a78bfa', overflowX: 'auto' }}>
              {/* Displaying raw JWT just to demonstrate it's there */}
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                <span style={{color: '#f43f5e'}}>Header:</span> {token.split('.')[0]}<br/><br/>
                <span style={{color: '#0ea5e9'}}>Payload:</span> {token.split('.')[1]}<br/><br/>
                <span style={{color: '#10b981'}}>Signature:</span> {token.split('.')[2]}
              </Typography>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
