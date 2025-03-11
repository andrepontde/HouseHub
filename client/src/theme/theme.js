import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/poppins/600.css';

import { createTheme } from '@mui/material/styles';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#4F46E5' : '#6366F1' }, // Deep Indigo / Bright Indigo
      secondary: { main: mode === 'dark' ? '#22D3EE' : '#06B6D4' }, // Cyan
      background: {
        default: mode === 'dark' ? '#111827' : '#F9FAFB', // Deep Gray / Soft White
        paper: mode === 'dark' ? '#1F2937' : '#E5E7EB', // Dark Blue-Gray / Cool Gray
      },
      text: {
        primary: mode === 'dark' ? '#E5E7EB' : '#1F2937', // Light Gray / Dark Gray
        secondary: mode === 'dark' ? '#9CA3AF' : '#6B7280', // Muted Slate
      },
      accent: { main: mode === 'dark' ? '#FBBF24' : '#FACC15' }, // Golden Yellow
      success: { main: mode === 'dark' ? '#10B981' : '#34D399' }, // Green
      error: { main: mode === 'dark' ? '#EF4444' : '#DC2626' }, // Red
      warning: { main: mode === 'dark' ? '#F59E0B' : '#FBBF24' }, // Amber
      images: {
        heroLogo: mode === 'dark' ? 'darkLogo' : 'lightLogo',
      },
    },
    typography: {
      fontFamily: '"Inter", "Poppins", sans-serif',
      h1: { fontSize: '2.25rem', fontWeight: 600 },
      h2: { fontSize: '1.75rem', fontWeight: 500 },
      h3: { fontSize: '1.5rem', fontWeight: 500 },
      body1: { fontSize: '1rem', fontWeight: 400 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: {
      borderRadius: 12, // Rounded corners for a softer feel
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: '500',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: mode === 'dark' ? '0 4px 10px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiAppBar:{
        styleOverrides: {
          root:{
            backgroundColor: mode === 'dark' ? '#4F46E5' : '#6366F1,',
            // Deep Indigo / Bright Indigo
          },
        },
      },
    },
  });

export default getTheme;
