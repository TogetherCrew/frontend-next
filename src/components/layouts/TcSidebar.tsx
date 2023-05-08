import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { constant } from '../../constants/Index';

interface TcSidebarProps {
  routes: { name: string; path: string }[];
}

const { drawerWidth, drawerBackgroundColor } = constant;

function TcSidebar({ routes }: TcSidebarProps) {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
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
      <List sx={{ flexGrow: 1 }}>
        {routes.map((route) => (
          <>
            <ListItemButton
              key={route.path}
              component={Link}
              to={route.path}
              sx={{
                width: '70%',
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: theme.palette.white.main,
                },
              }}
            >
              icon
            </ListItemButton>
            <ListItemText primary={route.name} sx={{ textAlign: 'center' }} />
          </>
        ))}
      </List>
    </Drawer>
  );
}

export default TcSidebar;
