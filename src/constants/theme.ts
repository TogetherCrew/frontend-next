import { createTheme } from '@mui/material/styles';
import { borderRadius, font, opacity, palette } from './MuiConfigs';

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    mode: 'light',
    ...palette,
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: '15px 20px',
          borderRadius: '6px',
          backgroundColor: '#222222',
          '& .MuiTooltip-arrow': {
            color: '#222222',
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
          textTransform: 'none', // change to a valid TextTransform value          fontSize: font.md,
        },
        contained: {
          background: palette.primary.main,
          '&:disabled': {
            background: palette.primary.dark,
            color: palette.white.main,
            opacity: opacity.base,
          },
        },
        outlined: {
          background: palette.gray.main,
          border: `1px solid ${palette.black.primary}`,
          color: palette.black.primary,
        },
      },
    },
  },
});
