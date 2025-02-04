// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { loginUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form.username, form.password);
      // Сохраняем токены в контексте
      login(data.access, data.refresh);
      enqueueSnackbar('Вход выполнен успешно', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.detail || 'Ошибка входа',
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Вход
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
          label="Пароль"
          name="password"
          type="password"
          value={form.password}
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
          {loading ? <CircularProgress size={24} /> : 'Войти'}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;

