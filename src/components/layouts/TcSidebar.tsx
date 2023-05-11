import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { constant } from '../../constants/Index';
import TcSidebarItem from './TcSidebarItem';

const { drawerWidth, drawerBackgroundColor, tcRoutes } = constant;

function TcSidebar() {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      data-testid="sidebar"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: drawerBackgroundColor,
          width: drawerWidth,
        },
        [theme.breakpoints.down('sm')]: {
          width: '100vw',
          '& .MuiDrawer-paper': {
            width: '100vw',
          },
        },
      }}
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={isSmallScreen}
      onClose={() => {}}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <TcSidebarItem sidebarMenuItems={tcRoutes} />
    </Drawer>
  );
}

export default TcSidebar;
