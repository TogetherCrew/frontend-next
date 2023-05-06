import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import NotFound from './pages/NotFound';
import { theme } from './constants/theme';
import { ThemeProvider } from '@mui/material';
import DefaultLayout from './layouts/DefaultLayout';
import { CssBaseline } from '@mui/material';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultLayout>
          <App />
        </DefaultLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}
