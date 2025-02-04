// src/components/AchievementList.jsx
import React from 'react';
import { Grid, Card, CardContent, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

// Обертка для карточки с анимациями Framer Motion
const MotionCard = motion(Card);

/**
 * Достижения пользователя.
 * Здесь задается примерный список достижений (настройте данные согласно вашей логике).
 */
const achievements = [
  {
    id: 1,
    title: 'Новичок',
    description: 'Завершите первые 5 челленджей',
    icon: '🏆',
  },
  {
    id: 2,
    title: '30-дневный стрик',
    description: 'Участвуйте 30 дней подряд',
    icon: '🔥',
  },
  // Можно добавить больше достижений по необходимости
];

/**
 * AchievementList
 *
 * Компонент отображает список карточек достижений.
 * При наведении на карточку показывается описание достижения.
 */
const AchievementList = () => (
  <Grid container spacing={2} sx={{ mt: 4 }}>
    {achievements.map((ach) => (
      <Grid item xs={12} sm={6} md={4} key={ach.id}>
        <Tooltip title={ach.description} arrow>
          <MotionCard
            // При наведении карточка немного увеличивается
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            sx={{ p: 2, textAlign: 'center' }}
          >
            <Typography variant="h3">{ach.icon}</Typography>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
              {ach.title}
            </Typography>
          </MotionCard>
        </Tooltip>
      </Grid>
    ))}
  </Grid>
);

export default AchievementList;
