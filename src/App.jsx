// src/App.jsx
// ✅ Внешние библиотеки
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

// ✅ Глобальные стили
import './App.css';
import './index.css';

// ✅ Компоненты приложения
import Navbar from './components/Navbar';

// ✅ Страницы
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ChallengesList from './pages/ChallengesList';
import ChallengeCreate from './pages/ChallengeCreate';
import ChallengeDetail from './pages/ChallengeDetail';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';

// ✅ Тема Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
    },
  },
});

/**
 * Главный компонент приложения
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/challenges" element={<ChallengesList />} />
          <Route path="/challenge/new" element={<ChallengeCreate />} />
          <Route path="/challenge/:id" element={<ChallengeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
