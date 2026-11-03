import { Button, CssBaseline, Container, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React + TypeScript + Material UI
        </Typography>
        <Button variant="contained" color="primary">
          Meu Botão
        </Button>
      </Container>
    </>
  );
}

export default App;
