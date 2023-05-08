import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import SvgIcon from '../SvgIcon';

interface TcSidebarItemProps {
  sidebarMenuItems: { name: string; path: string; icon: string }[];
}

function TcSidebarItem({ sidebarMenuItems }: TcSidebarItemProps) {
  const theme = useTheme();

  return (
    <List sx={{ flexGrow: 1 }}>
      {sidebarMenuItems.map((route) => (
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
              height: '38px',
            }}
          >
            <div style={{ paddingTop: '5px' }}>
              <SvgIcon
                iconName={route.icon}
                wrapperStyle={{ height: '100%' }}
              />
            </div>
          </ListItemButton>
          <ListItemText primary={route.name} sx={{ textAlign: 'center' }} />
        </>
      ))}
    </List>
  );
}

export default TcSidebarItem;
