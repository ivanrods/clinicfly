import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/pages/login-page';
import RegisterPage from './features/auth/pages/register-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
