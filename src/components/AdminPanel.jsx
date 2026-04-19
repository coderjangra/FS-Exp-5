import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Alert, CircularProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../AuthContext';
import { fetchAdminData } from '../api';

export default function AdminPanel() {
  const { token, user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAdminData(token);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Access Denied');
      }
    };
    loadData();
  }, [token]);

  return (
    <Box>
      <Box mb={6} display="flex" alignItems="center" gap={2}>
        <AdminPanelSettingsIcon color="error" sx={{ fontSize: 50 }} />
        <Box>
          <Typography variant="h2" color="error.light" gutterBottom>
            Admin Panel
          </Typography>
          <Typography variant="h6" color="text.secondary">
            @PreAuthorize("hasRole('ADMIN')") Endpoint
          </Typography>
        </Box>
      </Box>

      {error ? (
        <Alert 
          severity="error" 
          icon={<WarningAmberIcon fontSize="large" />}
          sx={{ 
            p: 4, 
            borderRadius: 4, 
            fontSize: '1.2rem', 
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>403 Forbidden</Typography>
          {error}
          <Typography variant="body1" mt={2} color="error.light">
            Your current role is: {user?.roles.join(', ')}. You need ROLE_ADMIN to view this page.
          </Typography>
        </Alert>
      ) : !data ? (
        <Box p={5} textAlign="center"><CircularProgress color="error" /></Box>
      ) : (
        <Card sx={{ p: 5, border: '1px solid rgba(244, 63, 94, 0.3)', bgcolor: 'rgba(244, 63, 94, 0.05)' }}>
          <Typography variant="h4" color="white" gutterBottom>
            Super Secret Admin Data
          </Typography>
          <Typography variant="body1" color="success.main" mb={4}>
            {data.adminSecret}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" mb={2}>Server Security Logs</Typography>
          <List sx={{ bgcolor: 'rgba(0,0,0,0.5)', borderRadius: 2, p: 2 }}>
            {data.systemLogs.map((log, i) => (
              <ListItem key={i}>
                <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
                <ListItemText primary={log} primaryTypographyProps={{ color: 'text.secondary', fontFamily: 'monospace' }} />
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </Box>
  );
}
