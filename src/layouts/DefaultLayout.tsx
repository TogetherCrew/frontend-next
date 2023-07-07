import { Box, Grid } from '@mui/material';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import TcSidebar from '../components/layouts/TcSidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <TcSidebar />
      <Box sx={{ flexGrow: 1, width: '100vh' }}>
        <Grid container spacing={0} mt={6}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <Outlet />
    </Box>
  );
}

export default DefaultLayout;
