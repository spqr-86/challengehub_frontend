// src/components/GamificationDashboard.jsx
import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import LevelProgress from './LevelProgress';
import AchievementList from './AchievementList';
import StreakIndicator from './StreakIndicator';
import { motion } from 'framer-motion';

// Анимационный вариант для появления элементов
const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * GamificationDashboard
 *
 * Этот компонент объединяет:
 * - LevelProgress: отображение текущего уровня и прогресса пользователя.
 * - AchievementList: список достижений и значков.
 * - StreakIndicator: отображение текущего стрика.
 *
 * Здесь используются анимации Framer Motion для плавного появления каждого раздела.
 */
const GamificationDashboard = () => {
  // Пример данных — в реальном приложении их нужно получать из API или контекста
  const currentPoints = 75;
  const nextLevelPoints = 150;
  const level = 4;
  const currentStreak = 10;

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      {/* Заголовок раздела */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeVariant}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Геймификация
        </Typography>
      </motion.div>

      {/* Компонент LevelProgress */}
      <motion.div initial="hidden" animate="visible" variants={fadeVariant} transition={{ duration: 1, delay: 0.2 }}>
        <LevelProgress currentPoints={currentPoints} nextLevelPoints={nextLevelPoints} level={level} />
      </motion.div>

      <Divider sx={{ my: 4 }} />

      {/* Компонент StreakIndicator */}
      <motion.div initial="hidden" animate="visible" variants={fadeVariant} transition={{ duration: 1, delay: 0.4 }}>
        <StreakIndicator streak={currentStreak} />
      </motion.div>

      <Divider sx={{ my: 4 }} />

      {/* Компонент AchievementList */}
      <motion.div initial="hidden" animate="visible" variants={fadeVariant} transition={{ duration: 1, delay: 0.6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          Ваши достижения
        </Typography>
        <AchievementList />
      </motion.div>
    </Container>
  );
};

export default GamificationDashboard;
