import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import TcSidebar from '../components/layouts/TcSidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={3} xl={4}>
        <TcSidebar />
      </Grid>
      <Grid item xs={12} md={3} xl={8}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            {children}
          </Grid>
        </Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default DefaultLayout;
