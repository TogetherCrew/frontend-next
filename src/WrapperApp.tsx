import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { theme } from './constants/theme';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient();

export function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
        <ToastContainer />
      </Router>
    </QueryClientProvider>
  );
}
