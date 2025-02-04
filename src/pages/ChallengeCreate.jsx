// src/pages/ChallengeCreate.jsx
// ✅ Внешние библиотеки
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ API
import { createChallenge } from '../api/challenges';

// ✅ Компоненты Material-UI
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';

// ✅ Контекст аутентификации
import { AuthContext } from '../context/AuthContext';

/**
 * Страница создания челленджа
 */
function ChallengeCreate() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Состояние формы
  const [challengeData, setChallengeData] = useState({
    title: '',
    description: '',
    duration: '',
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Если пользователь не авторизован
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Для создания челленджа необходимо авторизоваться.
        </Typography>
      </Container>
    );
  }

  /**
   * Обработчик изменения полей формы
   */
  const handleChange = (e) => {
    setChallengeData({ ...challengeData, [e.target.name]: e.target.value });
  };

  /**
   * Переключение состояния активности челленджа
   */
  const handleToggleActive = () => {
    setChallengeData((prev) => ({ ...prev, is_active: !prev.is_active }));
  };

  /**
   * Отправка данных на сервер
   */
  const handleCreateChallenge = async () => {
    if (
      !challengeData.title || 
      !challengeData.description || !challengeData.duration
    ) return;

    setLoading(true);
    setError(null);

    try {
      const newChallenge = await createChallenge(
        challengeData.title,
        challengeData.description,
        parseInt(challengeData.duration, 10), // ✅ Приводим к числу
        challengeData.is_active
      );
      navigate(`/challenge/${newChallenge.id}`);
    } catch (err) {
      console.error('Ошибка создания челленджа:', err);
      setError('Не удалось создать челлендж. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Создание челленджа
      </Typography>

      <Card sx={{ p: 2 }}>
        <CardContent>
          {/* ✅ Поле ввода названия */}
          <TextField
            fullWidth
            label="Название челленджа"
            name="title"
            value={challengeData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* ✅ Поле ввода описания */}
          <TextField
            fullWidth
            label="Описание"
            name="description"
            multiline
            rows={4}
            value={challengeData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* ✅ Поле ввода продолжительности */}
          <TextField
            fullWidth
            type="number"
            label="Продолжительность (дни)"
            name="duration"
            value={challengeData.duration}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* ✅ Переключатель активности */}
          <FormControlLabel
            control={
              <Switch
                checked={challengeData.is_active}
                onChange={handleToggleActive}
                color="primary"
              />
            }
            label={
              challengeData.is_active ? 'Челлендж активен' : 'Челлендж неактивен'
            }
          />

          {/* ✅ Ошибки */}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* ✅ Кнопка создания */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateChallenge}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Создать челлендж'}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ChallengeCreate;

