import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/poppins/600.css';

import { createTheme } from '@mui/material/styles';

const colorPalettes = {
  default: {
    primary: '#6366F1', // Indigo
    secondary: '#06B6D4', // Cyan
    accent: '#FACC15', // Yellow
  },
  blue: {
    primary: '#3B82F6', // Blue
    secondary: '#60A5FA', // Light Blue
    accent: '#93C5FD', // Soft Blue
  },
  green: {
    primary: '#10B981', // Emerald
    secondary: '#34D399', // Light Green
    accent: '#6EE7B7', // Mint
  },
  red: {
    primary: '#EF4444', // Red
    secondary: '#F87171', // Light Red
    accent: '#FCA5A5', // Soft Red
  },
  purple: {
    primary: '#8B5CF6', // Purple
    secondary: '#A78BFA', // Light Purple
    accent: '#C4B5FD', // Soft Purple
  },
  orange: {
    primary: '#F97316', // Orange
    secondary: '#FB923C', // Light Orange
    accent: '#FDBA74', // Soft Orange
  },
  pink: {
    primary: '#EC4899', // Pink
    secondary: '#F472B6', // Light Pink
    accent: '#F9A8D4', // Soft Pink
  },
};

const getTheme = (mode, paletteType = 'default') =>
  createTheme({
    palette: {
      mode,
      primary: { main: colorPalettes[paletteType].primary },
      secondary: { main: colorPalettes[paletteType].secondary },
      accent: { main: colorPalettes[paletteType].accent },
      background: {
        default: mode === 'dark' ? '#111827' : '#F9FAFB',
        paper: mode === 'dark' ? '#1F2937' : '#E5E7EB',
      },
      text: {
        primary: mode === 'dark' ? '#E5E7EB' : '#1F2937',
        secondary: mode === 'dark' ? '#9CA3AF' : '#6B7280',
      },
      success: { main: mode === 'dark' ? '#10B981' : '#34D399' },
      error: { main: mode === 'dark' ? '#EF4444' : '#DC2626' },
      warning: { main: mode === 'dark' ? '#F59E0B' : '#FBBF24' },
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
      borderRadius: 12,
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
            boxShadow:
              mode === 'dark'
                ? '0 4px 10px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colorPalettes[paletteType].primary,
          },
        },
      },
    },
  });

export default getTheme;
