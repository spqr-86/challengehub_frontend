// src/components/LevelProgress.jsx
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

/**
 * LevelProgress
 *
 * Компонент отображает:
 * - Текущий уровень пользователя.
 * - Прогресс (в виде progress bar) от текущего количества очков до требуемого количества очков для следующего уровня.
 *
 * Props:
 *   currentPoints {number} - Количество набранных очков (XP).
 *   nextLevelPoints {number} - Количество очков, необходимых для перехода на следующий уровень.
 *   level {number} - Текущий уровень пользователя.
 *
 * Пример: если currentPoints = 40, nextLevelPoints = 100, level = 3,
 * компонент покажет уровень 3 и заполнит progress bar на 40%.
 */
const LevelProgress = ({ currentPoints, nextLevelPoints, level }) => {
  // Вычисляем процент заполнения, но не более 100%
  const progress = Math.min((currentPoints / nextLevelPoints) * 100, 100);

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h6">Уровень {level}</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5, mt: 1 }}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {currentPoints} / {nextLevelPoints} очков до следующего уровня
      </Typography>
    </Box>
  );
};

export default LevelProgress;
