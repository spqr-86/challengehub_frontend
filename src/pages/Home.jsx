// src/pages/ProductOverview.jsx
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Обертка для использования Box с анимациями Framer Motion
const MotionBox = motion(Box);

// Базовый вариант анимации для появления элементов
const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Компонент ParallaxSection с базовым эффектом параллакса (backgroundAttachment: 'fixed')
const ParallaxSection = ({ backgroundImage, height = '400px', children, overlayColor = 'rgba(0, 0, 0, 0.4)' }) => (
  <Box
    sx={{
      height,
      backgroundImage: `url(${backgroundImage})`,
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      mb: 4,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: overlayColor,
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        p: { xs: 2, md: 4 },
        maxWidth: '900px',
      }}
    >
      {children}
    </Box>
  </Box>
);

// Пример компонента ProgressBar для демонстрации прогресса
const ProgressBar = ({ progress }) => (
  <div style={{ margin: '1rem auto', maxWidth: 300 }}>
    <div
      style={{
        height: '24px',
        backgroundColor: '#e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#4A90E2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.4s ease-in-out',
        }}
        role="progressbar"
        aria-valuenow={progress}
      >
        <span style={{ color: '#fff', fontWeight: 'bold' }}>{progress}%</span>
      </div>
    </div>
  </div>
);

// Компонент HowItWorks – объясняет путь в 3 шага с интерактивными элементами
const HowItWorks = () => (
  <Box sx={{ textAlign: 'center', my: 8 }}>
    <MotionBox
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Твой путь в 3 шага
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography variant="h3" sx={{ mb: 2 }}>🎯</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Выбери цель
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              От изучения Python до марафона
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography variant="h3" sx={{ mb: 2 }}>🤝</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Присоединись
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Лично или с командой
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography variant="h3" sx={{ mb: 2 }}>🚀</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Достигай
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              С поддержкой комьюнити
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MotionBox>
  </Box>
);

// Компонент ReviewsSection – отзывы и успешные кейсы
const ReviewsSection = () => (
  <Container maxWidth="lg" sx={{ my: 8 }}>
    <MotionBox
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        Истории успеха
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, minHeight: 180 }}>
            <CardContent>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                "ChallengeHub помог мне наладить здоровый образ жизни. Теперь утренние пробежки — моя привычка!"
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Анна, 28 лет
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, minHeight: 180 }}>
            <CardContent>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                "Как создатель челленджей, я вижу, как моя программа помогает людям достигать целей. Это вдохновляет!"
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Михаил, тренер
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, minHeight: 180 }}>
            <CardContent>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                "Благодаря платформе я не только улучшил свои навыки, но и нашёл друзей по интересам."
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Екатерина, дизайнер
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MotionBox>
  </Container>
);

// Компонент StickyCTA – фиксированная кнопка "Присоединиться", которая всегда видна внизу экрана
const StickyCTA = () => (
  <Box sx={{ position: 'fixed', bottom: 16, left: 0, right: 0, zIndex: 1000, textAlign: 'center' }}>
    <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 1 }}>
      <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/challenges">
        Присоединиться
      </Button>
    </MotionBox>
  </Box>
);

function ProductOverview() {
  return (
    <Box sx={{ overflow: 'hidden', backgroundColor: '#f5f5f5', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {/* Hero-секция с параллаксом */}
      <ParallaxSection backgroundImage="https://via.placeholder.com/1920x1080?text=ChallengeHub+Hero">
        <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 1.5 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontFamily: '"San Francisco", sans-serif' }}>
            ChallengeHub
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: '"San Francisco", sans-serif' }}>
            Платформа для личностного роста через челленджи
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontStyle: 'italic', fontWeight: 400 }}>
            «Где цели становятся привычками, а сообщество вдохновляет»
          </Typography>
        </MotionBox>
      </ParallaxSection>

      {/* Краткое описание и призыв к действию */}
      <Container maxWidth="lg">
        <MotionBox
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.5, delay: 0.3 }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
            Присоединяйся к революции саморазвития!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Уже <b>50,000+</b> пользователей начали свой путь. ChallengeHub даёт возможность превратить цели в привычки, а сообщество помогает оставаться мотивированным на каждом шагу.
          </Typography>
        </MotionBox>
      </Container>

      {/* Секция: Как это работает */}
      <Container maxWidth="md">
        <HowItWorks />
      </Container>

      {/* Параллакс-секция: MVP-функционал */}
      <ParallaxSection backgroundImage="https://via.placeholder.com/1920x1080?text=MVP" height="300px" overlayColor="rgba(0, 0, 0, 0.5)">
        <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 1.8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            MVP-функционал: уже реализовано
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Мы запустили базовые возможности для создателей и участников, чтобы вы могли достичь результатов уже сейчас.
          </Typography>
        </MotionBox>
      </ParallaxSection>

      {/* Подробности MVP-функционала */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <MotionBox
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, delay: 0.2 }}
          sx={{ textAlign: 'center' }}
        >
          <Grid container spacing={4}>
            {/* Блок для создателей челленджей */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Для создателей челленджей
              </Typography>
              <List sx={{ display: 'inline-block', textAlign: 'left' }}>
                <ListItem>
                  <ListItemText
                    primary="✅ Создание структурированных программ"
                    secondary="Многоэтапные челленджи с задачами на каждый день. Гибкие настройки: длительность, теги, уровень сложности."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✅ Аналитика участия"
                    secondary="Графики прогресса, статистика завершения задач."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✅ Мотивационные инструменты"
                    secondary="Автоматические напоминания, шаблоны вдохновляющих сообщений."
                  />
                </ListItem>
              </List>
            </Grid>

            {/* Блок для участников челленджей */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Для участников
              </Typography>
              <List sx={{ display: 'inline-block', textAlign: 'left' }}>
                <ListItem>
                  <ListItemText
                    primary="✅ Персонализированная лента"
                    secondary="Рекомендации по интересам: спорт, обучение, творчество. Фильтры по сложности и длительности."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✅ Интерактивный трекер"
                    secondary="Прогресс-бар выполнения задач, виртуальные награды за стрики."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✅ Социальное взаимодействие"
                    secondary="Комментарии к заданиям, публичный профиль с достижениями."
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>

      {/* Пример использования ProgressBar */}
      <Container maxWidth="md">
        <MotionBox
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2, delay: 0.3 }}
          sx={{ textAlign: 'center', mb: 4 }}
        >
          <Typography variant="h6">Пример прогресса тестового челленджа</Typography>
          <ProgressBar progress={67} />
        </MotionBox>
      </Container>

      {/* Секция: Отзывы и успешные кейсы */}
      <ReviewsSection />

      {/* Технологический стек */}
      <Paper sx={{ backgroundColor: '#f0f0f0', py: 6, px: 2, textAlign: 'center', mb: 6 }} elevation={0}>
        <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 2.2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Технологический стек
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Мы выбрали передовые инструменты, чтобы обеспечить высокую производительность, надёжность и удобство разработки.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Frontend
              </Typography>
              <List sx={{ textAlign: 'left', display: 'inline-block' }}>
                <ListItem>
                  <ListItemText primary="React + Vite" secondary="Ультра-быстрая загрузка" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Framer Motion" secondary="Кинетические анимации" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="React Query" secondary="Кеширование данных" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Backend
              </Typography>
              <List sx={{ textAlign: 'left', display: 'inline-block' }}>
                <ListItem>
                  <ListItemText primary="Django REST Framework" secondary="Гибкий и быстрый API" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="PostgreSQL" secondary="Оптимизированные индексы" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Celery" secondary="Фоновые задачи и очереди" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </MotionBox>
      </Paper>

      {/* Roadmap: В разработке (Q3 2024) */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 2.4 }} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            В разработке (Roadmap Q3 2024)
          </Typography>
          <Grid container spacing={4}>
            {/* Для создателей */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Для создателей
              </Typography>
              <List sx={{ display: 'inline-block', textAlign: 'left' }}>
                <ListItem>
                  <ListItemText primary="🛠 Монетизация" secondary="Платные челленджи, партнёрская программа" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="🛠 Продвинутая аналитика" secondary="Heatmap активности, AI-предсказания оттока" />
                </ListItem>
              </List>
            </Grid>
            {/* Для участников */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Для участников
              </Typography>
              <List sx={{ display: 'inline-block', textAlign: 'left' }}>
                <ListItem>
                  <ListItemText primary="🛠 Геймификация" secondary="Система уровней (Новичок → Гуру), батлы между участниками" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="🛠 Интеграции" secondary="Apple Health/Google Fit, Zoom для групповых активностей" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>

      {/* Безопасность и надёжность */}
      <Paper sx={{ py: 6, px: 2, backgroundColor: '#fff', textAlign: 'center', mb: 6 }} elevation={0}>
        <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 2.6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Безопасность и надёжность
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Мы храним данные в соответствии с GDPR, делаем ежедневные бэкапы в разные зоны доступности и используем DDoS‑защиту Cloudflare.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">GDPR-совместимое хранение</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Бэкапы в 3 зонах</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Cloudflare DDoS-защита</Typography>
            </Grid>
          </Grid>
        </MotionBox>
      </Paper>

      {/* Финальный призыв к действию */}
      <Paper
        sx={{
          backgroundColor: '#4A90E2',
          color: '#fff',
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: 2,
          borderRadius: 0,
        }}
        elevation={3}
      >
        <MotionBox variants={fadeVariant} initial="hidden" animate="visible" transition={{ duration: 2.8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: '"San Francisco", sans-serif' }}>
            Присоединяйся к ChallengeHub
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Начни своё приключение сегодня! Стань частью сообщества, которое поддерживает и мотивирует на каждом шагу. Сделай первый шаг к новым целям и привычкам уже сейчас.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/challenges">
              Присоединиться
            </Button>
          </Box>
        </MotionBox>
      </Paper>

      {/* Sticky CTA – фиксированная кнопка "Присоединиться" внизу экрана */}
      <StickyCTA />
    </Box>
  );
}


export default ProductOverview;
