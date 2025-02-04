// src/pages/Registration.jsx
import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { registerUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useContext(AuthContext); // Функция для сохранения токенов в контексте
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      enqueueSnackbar('Пароли не совпадают', { variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      // Вызываем API для регистрации
      const data = await registerUser(form.username, form.email, form.password);
      // Если регистрация успешна, автоматически логиним пользователя
      login(data.access, data.refresh);
      enqueueSnackbar('Регистрация успешна!', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.detail || 'Ошибка регистрации',
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Регистрация
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          required
          fullWidth
          label="Имя пользователя"
          name="username"
          value={form.username}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Пароль"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Подтверждение пароля"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
        </Button>
      </Box>
    </Container>
  );
}

export default Registration;
