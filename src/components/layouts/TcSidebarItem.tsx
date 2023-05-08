import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from '../SvgIcon';

interface TcSidebarItemProps {
  sidebarMenuItems: {
    name: string;
    path: string;
    icon: string;
    isDisabledRoute?: boolean;
  }[];
}

function TcSidebarItem({ sidebarMenuItems }: TcSidebarItemProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <List sx={{ width: '75%' }}>
        {sidebarMenuItems.map((route) => (
          <>
            {route.isDisabledRoute ? (
              <Tooltip
                title={<Typography variant="body2">Comming soon</Typography>}
                placement="right"
                arrow
                classes={{ tooltip: 'tooltip' }}
              >
                <ListItemButton
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: 'auto',
                    borderRadius: '10px',
                    height: '38px',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                    },
                  }}
                >
                  <div style={{ paddingTop: '5px' }}>
                    <SvgIcon
                      iconName={route.icon}
                      wrapperStyle={{ height: '100%' }}
                    />
                  </div>
                </ListItemButton>
              </Tooltip>
            ) : (
              <ListItemButton
                key={route.path}
                component={Link}
                to={route.path}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 'auto',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
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
            )}
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                fontWeight: '400',
                paddingBottom: '1rem',
              }}
            >
              {route.name}
            </Typography>
          </>
        ))}
      </List>
    </div>
  );
}

export default TcSidebarItem;
