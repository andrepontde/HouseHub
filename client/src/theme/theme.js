
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

import { createTheme } from '@mui/material/styles';


const getTheme = (mode) => // for this file this will hold the new color scheme for all pages which opt for light or dark mode , It will simply be an export that we will wrap our entire app with using <ThemeProvider > using mui , this will save overwriting styling in individual files .
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#3b82f6' : '#2563eb' },
      secondary: { main: mode === 'dark' ? '#10b981' : '#14b8a6' },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f8fafc',
        paper: mode === 'dark' ? '#1e293b' : '#e2e8f0',
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#1e293b',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
      accent: { main: mode === 'dark' ? '#facc15' : '#f59e0b' },
      images:
        {heroLogo : mode === 'dark' ? "darkLogo" : "lightLogo",
      },
    },
    typography:{
        fontFamily: '"Sniglet", "Roboto", sans-serif',

    },



  });

export default getTheme;
// primary.main	#2563eb (Bright Blue)	#3b82f6 (Electric Blue)
// secondary.main	#14b8a6 (Teal Green)	#10b981 (Vibrant Green)
// background.default	#f8fafc (Soft Gray White)	#0f172a (Deep Navy Blue)
// background.paper	#e2e8f0 (Muted Gray)	#1e293b (Dark Gray Blue)
// text.primary	#1e293b (Deep Gray Blue)	#f8fafc (Near White)
// text.secondary	#64748b (Muted Slate Gray)	#94a3b8 (Cool Gray)
// accent.main	#f59e0b (Warm Amber)	#facc15 (Soft Yellow)