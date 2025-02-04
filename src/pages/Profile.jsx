// src/pages/Profile.jsx
import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LevelProgress from '../components/LevelProgress';
import AchievementList from '../components/AchievementList';
import StreakIndicator from '../components/StreakIndicator';
import { AuthContext } from '../context/AuthContext';

// Создаём обёртку MotionBox для удобства использования Framer Motion с Box
const MotionBox = motion(Box);

// Анимационный вариант для плавного появления элементов
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Profile
 *
 * Страница профиля пользователя содержит:
 * - Верхнюю секцию с аватаром, именем, email и базовой информацией.
 * - Раздел "О себе", который можно редактировать.
 * - Блок геймификации с уровнем, прогресс-баром, текущим стриком и списком достижений.
 *
 * Используем современные визуальные решения:
 * - Большой аватар с рамкой и тенью для привлечения внимания.
 * - Card-like элементы (Paper) для секций с лёгкой прозрачностью.
 * - Чёткая типографика и достаточные отступы для создания пространства.
 * - Плавные анимации появления элементов с помощью Framer Motion.
 */
function Profile() {
  // Получаем данные пользователя и функцию логаута из контекста
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Состояние для редактируемой биографии (поле "О себе")
  const [bio, setBio] = useState(user && user.bio ? user.bio : '');
  const [isEditing, setIsEditing] = useState(false);

  // Переключение режима редактирования
  const handleEditToggle = () => setIsEditing(!isEditing);

  // Обработчик сохранения биографии (здесь можно интегрировать вызов API)
  const handleSaveBio = () => {
    // TODO: Отправить обновлённое значение bio на сервер
    setIsEditing(false);
  };

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Если пользователь не авторизован, отображаем сообщение
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">
          Пользователь не найден. Пожалуйста, войдите в систему.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      {/* Верхняя секция профиля */}
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', mb: 4 }}
      >
        <Avatar
          // Можно добавить поле src={user.avatar} если есть URL аватара
          sx={{
            width: 140,
            height: 140,
            mx: 'auto',
            mb: 2,
            border: '4px solid',
            borderColor: 'primary.main',
            boxShadow: 3,
          }}
        >
          {user.first_name ? user.first_name[0].toUpperCase() : user.username[0].toUpperCase()}
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1">{user.email}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Роль: {user.role || 'Пользователь'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditToggle}
            sx={{ mr: 1 }}
          >
            {isEditing ? 'Отмена' : 'Редактировать профиль'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </MotionBox>

      <Divider sx={{ my: 4 }} />

      {/* Раздел "О себе" */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.9)',
        }}
      >
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            О себе
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Расскажите о себе..."
            />
          ) : (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {bio || 'Пользователь ещё не добавил информацию о себе.'}
            </Typography>
          )}
          {isEditing && (
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button variant="contained" color="primary" onClick={handleSaveBio}>
                Сохранить
              </Button>
            </Box>
          )}
        </MotionBox>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Блок геймификации и социальных элементов */}
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
        >
          Ваши достижения
        </Typography>
        <Grid container spacing={4}>
          {/* Компонент, отображающий уровень и прогресс */}
          <Grid item xs={12} sm={6}>
            <LevelProgress currentPoints={75} nextLevelPoints={150} level={4} />
          </Grid>
          {/* Компонент, отображающий текущий стрик */}
          <Grid item xs={12} sm={6}>
            <StreakIndicator streak={10} />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <AchievementList />
        </Box>
      </MotionBox>
    </Container>
  );
}

export default Profile;
