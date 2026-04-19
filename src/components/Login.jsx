import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, CircularProgress, Alert, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../AuthContext';
import { authenticate, oauth2Login } from '../api';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await authenticate(username, password);
      login(res.data.token); // Save JWT to context/localStorage
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const res = await oauth2Login();
      login(res.data.token);
    } catch (err) {
      setError("OAuth2 flow failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const autofill = (user) => {
    setUsername(user);
    setPassword('password');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        p: 3,
        bgcolor: '#000000'
      }}
    >
      <Card 
        sx={{ 
          maxWidth: 400, 
          width: '100%', 
          p: 4, 
          borderRadius: 2, 
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 1.5, borderRadius: 2, mb: 2 }}>
            <LockOutlinedIcon sx={{ fontSize: 28, color: '#ffffff' }} />
          </Box>
          <Typography variant="h4" color="white" gutterBottom>
            Secure Login
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Experiment 2.2: JWT Auth & RBAC
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 1, p: 1.5 }}>
            {error}
          </Alert>
        )}

        <Box mb={4}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Demo Credentials:
          </Typography>
          <Box display="flex" gap={1}>
            <Button size="small" variant="outlined" onClick={() => autofill('admin')} sx={{ py: 0.5, px: 1 }}>
              Admin (ROLE_ADMIN)
            </Button>
            <Button size="small" variant="outlined" onClick={() => autofill('user')} sx={{ py: 0.5, px: 1 }}>
              User (ROLE_USER)
            </Button>
          </Box>
        </Box>

        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading || googleLoading}
              size="small"
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading || googleLoading}
              size="small"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading || googleLoading}
              sx={{ mt: 1, py: 1.2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Email'}
            </Button>
          </Box>
        </form>

        <Box my={3} display="flex" alignItems="center" gap={2} color="text.secondary">
          <Divider sx={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>OR</Typography>
          <Divider sx={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
        </Box>

        <Button 
          variant="contained" 
          color="secondary" 
          fullWidth 
          startIcon={!googleLoading && <GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          sx={{ py: 1.2 }}
        >
          {googleLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Google'}
        </Button>
      </Card>
    </Box>
  );
}
