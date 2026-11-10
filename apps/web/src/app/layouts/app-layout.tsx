import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* <Sidebar /> e <Header /> entram aqui */}
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
