import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/use-auth';
import { useLogout } from '../../features/auth/hooks/use-logout';

export function AppLayout() {
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ClinicFly
          </Typography>

          {user && (
            <Typography variant="body2" color="text.secondary">
              {user.name}
            </Typography>
          )}

          <Button onClick={logout} variant="outlined" size="small">
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
