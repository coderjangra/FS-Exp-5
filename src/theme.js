import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Clean white
      light: '#f8fafc',
      dark: '#e2e8f0',
      contrastText: '#000000',
    },
    secondary: {
      main: '#a1a1aa', // Subtle gray
      light: '#e4e4e7',
      dark: '#71717a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000', // Pure black for modern OLED look
      paper: '#09090b', // Slightly off-black
    },
    success: {
      main: '#10b981', // Emerald
    },
    warning: {
      main: '#f59e0b', // Amber
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#3b82f6', // Blue
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.04em' },
    h2: { fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontWeight: 600, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 500, letterSpacing: '-0.01em' },
    h6: { fontWeight: 500, letterSpacing: '-0.01em' },
    button: { fontWeight: 500, letterSpacing: '0.01em' },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 8, // Sleek, minimal rounding
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
          backgroundImage: 'none', // Remove gradients for a clean modern look
          minHeight: '100vh',
          margin: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#09090b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#09090b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#000000',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          padding: '10px 20px',
          transition: 'all 0.15s ease',
        },
        containedPrimary: {
          background: '#ffffff',
          color: '#000000',
          border: '1px solid #ffffff',
          boxShadow: 'none',
          '&:hover': {
            background: '#e4e4e7',
            borderColor: '#e4e4e7',
            boxShadow: 'none',
          }
        },
        containedSecondary: {
          background: '#18181b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            background: '#27272a',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
          }
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }
        }
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.15s ease',
          padding: '8px',
          color: '#a1a1aa',
          '&:hover': {
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#09090b',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff', 
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              backgroundColor: '#000000',
            }
          },
          '& .MuiInputLabel-root': {
            color: '#a1a1aa',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#09090b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
          borderRadius: '12px',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
          padding: '4px',
        },
        outlined: {
          borderWidth: '1px',
          borderColor: 'rgba(255, 255, 255, 0.15)',
        }
      }
    }
  },
});
