import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import App from './App';
import { theme } from './constants/theme';

export function WrappedApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
