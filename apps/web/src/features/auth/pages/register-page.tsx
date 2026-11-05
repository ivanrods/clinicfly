import { Box, Button, TextField, Typography } from '@mui/material';

export default function RegisterPage() {
  return (
    <Box>
      <Typography>Faça seu cadastro</Typography>

      <Box>
        <TextField type="text" placeholder="Nome"  />

        <TextField type="email" placeholder="E-mail"  />

        <TextField type="password" placeholder="Senha" />

        <Button type="submit" size="large" variant="contained">
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}
