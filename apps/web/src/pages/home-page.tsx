import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { paths } from '../shared/routing/paths';

export default function HomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        ClinicFly
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Área autenticada. Acesse o gerenciamento de pacientes.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button component={RouterLink} to={paths.patients} variant="contained">
          Pacientes
        </Button>
      </Stack>
    </Box>
  );
}
