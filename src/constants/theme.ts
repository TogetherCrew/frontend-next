import { createTheme, alpha } from '@mui/material/styles';
import { borderRadius, font, typography, palette } from './MuiConfigs';

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    ...typography,
  },
  palette: {
    mode: 'light',
    ...palette,
    action: {
      disabledBackground: alpha(palette.primary.main, 0.6),
      disabled: palette.white.main,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Remove margin and padding from HTML element
        '@global': {
          html: {
            margin: 0,
            padding: 0,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.30)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '&$checked': {
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: '15px 20px',
          borderRadius: '6px',
          backgroundColor: palette.secondary.main,
          '& .MuiTooltip-arrow': {
            color: palette.secondary.main,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontSize: font.md,
          borderRadius: borderRadius.base,
          textTransform: 'none',
          '&:focus': {
            outline: 'none',
          },
          '&:hover': { outline: 'none' },
        },
      },
    },
  },
});
