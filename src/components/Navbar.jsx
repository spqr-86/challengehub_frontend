// src/components/Navbar.jsx
// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Info,
  ListAlt,
  AddCircle,
  AccountCircle,
  PersonAdd,
  ExitToApp,
} from '@mui/icons-material';

export default function Navbar() {
  const { accessToken, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  // Функция открытия меню для мобильных устройств
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Функция закрытия меню
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Функция выхода из аккаунта
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  // Основные пункты навигации
  const navItems = [
    { label: 'Главная', path: '/', icon: <Home /> },
    { label: 'О нас', path: '/about', icon: <Info /> },
    { label: 'Челленджи', path: '/challenges', icon: <ListAlt /> },
    { label: 'Создать', path: '/challenge/new', icon: <AddCircle /> },
  ];

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ boxShadow: 3 }}
    >
      <Toolbar>
        {/* Логотип */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          ChallengeHub
        </Typography>

        {/* Мобильная версия */}
        {isMobile ? (
          <>
            <IconButton size="large" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleMenuClose}
                >
                  {item.icon}
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
              {accessToken ? (
                <>
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    <AccountCircle />
                    <Typography variant="inherit" sx={{ ml: 1 }}>
                      Профиль
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp />
                    <Typography variant="inherit" sx={{ ml: 1 }}>
                      Выйти
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    component={RouterLink}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    <AccountCircle />
                    <Typography variant="inherit" sx={{ ml: 1 }}>
                      Войти
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/register"
                    onClick={handleMenuClose}
                  >
                    <PersonAdd />
                    <Typography variant="inherit" sx={{ ml: 1 }}>
                      Регистрация
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          // Десктопная версия
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}
            {accessToken ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/profile"
                  startIcon={<AccountCircle />}
                >
                  Профиль
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<ExitToApp />}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  startIcon={<AccountCircle />}
                >
                  Войти
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  startIcon={<PersonAdd />}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

