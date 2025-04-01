// components/ThemeSelector.js

import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const themeOptions = {
  default: 'Indigo (Default)',
  blue: 'Blue',
  green: 'Green',
  red: 'Red',
  purple: 'Purple',
  orange: 'Orange',
  pink: 'Pink',
};

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = (themeKey) => {
    setAnchorEl(null);
    if (themeKey && themeKey !== currentTheme) {
      onThemeChange(themeKey);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<PaletteIcon />}
        onClick={handleClick}
        sx={{ mt: 1 }}
      >
        Theme: {themeOptions[currentTheme] || 'Select'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        {Object.entries(themeOptions).map(([key, label]) => (
          <MenuItem key={key} onClick={() => handleClose(key)}>
            <ListItemIcon>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: getSampleColor(key),
                  border: '1px solid #ccc',
                }}
              />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const getSampleColor = (themeKey) => {
  const samples = {
    default: '#6366F1',
    blue: '#3B82F6',
    green: '#10B981',
    red: '#EF4444',
    purple: '#8B5CF6',
    orange: '#F97316',
    pink: '#EC4899',
  };
  return samples[themeKey] || '#6366F1';
};

export default ThemeSelector;
