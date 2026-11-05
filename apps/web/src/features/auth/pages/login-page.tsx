import { Box, Button, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <Box>
      <Typography>Faça seu login</Typography>

      <Box>
        <TextField type="email" placeholder="E-mail" />

        <TextField type="password" placeholder="Senha" />

        <Button type="submit" size="large" variant="contained">
          Entrar
        </Button>
      </Box>
    </Box>
  );
}
