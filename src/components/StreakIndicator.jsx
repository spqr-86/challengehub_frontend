// src/components/StreakIndicator.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * StreakIndicator
 *
 * Компонент отображает текущий стрик пользователя.
 *
 * Props:
 *   streak {number} - Количество дней подряд, когда пользователь активно выполнял задания.
 *
 * Пример: если streak = 7, то компонент покажет «7 дней подряд».
 */
const StreakIndicator = ({ streak }) => {
  // Анимация для иконки стрика
  const iconAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 0.8, repeat: Infinity, repeatType: 'mirror' },
  };

  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Текущий стрик
      </Typography>
      <motion.div animate={iconAnimation}>
        <Typography variant="h2" sx={{ color: '#FF5722' }}>
          🔥
        </Typography>
      </motion.div>
      <Typography variant="body1">
        {streak} {streak === 1 ? 'день' : 'дней'} подряд
      </Typography>
    </Box>
  );
};

export default StreakIndicator;
