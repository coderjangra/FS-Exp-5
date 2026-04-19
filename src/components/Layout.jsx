import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../AuthContext';

const drawerWidth = 280;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Admin Panel', icon: <AdminPanelSettingsIcon />, path: '/admin' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 900, width: 48, height: 48 }}>
          {user?.name?.charAt(0) || 'U'}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main', lineHeight: 1.2 }}>
            Secure<span style={{ color: '#fff' }}>App</span>
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            {user?.roles.join(', ')}
          </Typography>
        </Box>
      </Box>
      
      <List sx={{ px: 3, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 2 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                sx={{
                  borderRadius: '16px',
                  py: 1.5,
                  bgcolor: isActive ? 'rgba(244, 63, 94, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary', minWidth: 46 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: isActive ? 800 : 600, color: isActive ? 'white' : 'text.secondary' }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      
      <Box p={3}>
        <Button 
          fullWidth 
          variant="outlined" 
          color="error" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout}
          sx={{ py: 1.5, borderRadius: '16px' }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 }, py: 1 }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="800" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {menuItems.find(i => i.path === location.pathname)?.text || 'Application'}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="secondary" startIcon={<InfoIcon />} onClick={() => setInfoOpen(true)} sx={{ borderRadius: '12px' }}>
              Experiment Details
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, sm: 6 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Outlet />
      </Box>

      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'secondary.main', display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2 }}>
          <InfoIcon fontSize="large" /> Experiment 2.2: Spring Security
        </DialogTitle>
        <DialogContent sx={{ mt: 3, color: 'text.secondary' }}>
          <Typography paragraph><strong style={{color: 'white'}}>JWT Authentication:</strong> The login portal simulates verifying credentials and returning a Base64 encoded JSON Web Token containing roles and expiration claims.</Typography>
          <Typography paragraph><strong style={{color: 'white'}}>RBAC (@PreAuthorize):</strong> The Admin Panel simulates a protected endpoint. If you log in as 'user', the server mocks a 403 Forbidden response.</Typography>
          <Typography paragraph><strong style={{color: 'white'}}>OAuth2 Integration:</strong> The Google button mocks an OAuth2 redirect flow, returning an authenticated session.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={() => setInfoOpen(false)} variant="contained" color="secondary" fullWidth>Got it!</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
