// src/pages/About.jsx
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Fade,
  Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function About() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Hero-секция */}
      <Paper
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%)',
          color: '#fff',
          p: { xs: 4, md: 8 },
          mb: 4,
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
        elevation={3}
      >
        <Fade in={true} timeout={1500}>
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"San Francisco", sans-serif',
              }}
            >
              Добро пожаловать в ChallengeHub
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontFamily: '"San Francisco", sans-serif' }}
            >
              Платформа для личных и групповых вызовов, вдохновляющая на рост и
              развитие
            </Typography>
          </Box>
        </Fade>
      </Paper>

      {/* Основное содержимое */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* О продукте */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1500}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}
                >
                  О продукте
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                  ChallengeHub – это инновационная платформа, созданная для того,
                  чтобы помочь людям бросить вызов себе и достичь новых высот.
                  Наш сервис позволяет создавать и участвовать в разнообразных
                  челленджах, отслеживать прогресс и делиться успехами.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                  Мы верим, что каждый вызов – это возможность развиваться, учиться
                  новому и становиться лучше. Удобный интерфейс, качественная анимация
                  и интуитивное управление делают работу с платформой по-настоящему
                  увлекательной.
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                  Наш продукт разработан для тех, кто стремится к личностному росту
                  и хочет быть частью активного сообщества единомышленников. Мы
                  постоянно собираем обратную связь и совершенствуем функционал,
                  чтобы сделать ваш опыт максимально комфортным и вдохновляющим.
                </Typography>
              </Box>
            </Fade>
          </Grid>

          {/* Иллюстрация продукта */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={2000}>
              <Box>
                <img
                  src="https://via.placeholder.com/600x400?text=Challenge+Hub"
                  alt="ChallengeHub Product"
                  style={{
                    width: '100%',
                    borderRadius: 8,
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            </Fade>
          </Grid>

          {/* План улучшений */}
          <Grid item xs={12}>
            <Fade in={true} timeout={2500}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}
                >
                  План улучшений
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                  Для достижения MVP мы уже реализовали базовые функции:
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    textAlign: 'left',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    pl: 2,
                  }}
                >
                  <li>Регистрация и аутентификация пользователей (JWT).</li>
                  <li>
                    Создание, редактирование и удаление челленджей с задачами и
                    отслеживанием прогресса.
                  </li>
                  <li>Удобный поиск и фильтрация челленджей.</li>
                  <li>
                    Интуитивный и отзывчивый интерфейс для любых устройств.
                  </li>
                </Box>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mt: 2 }}>
                  В ближайших планах мы хотим добавить следующие возможности:
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    textAlign: 'left',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    pl: 2,
                  }}
                >
                  <li>
                    Социальное взаимодействие: комментарии, лайки, рейтинги
                    челленджей.
                  </li>
                  <li>
                    Геймификация: система баллов, значков и лидербордов для
                    мотивации.
                  </li>
                  <li>Персональные рекомендации и аналитика прогресса.</li>
                  <li>
                    Интеграция с фитнес-трекерами и мобильное приложение для
                    постоянного доступа.
                  </li>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mt: 3 }}
                  component={RouterLink}
                  to="/challenges"
                >
                  Перейти к челленджам
                </Button>
              </Box>
            </Fade>
          </Grid>

          {/* Дополнительные ссылки и информация */}
          <Grid item xs={12}>
            <Fade in={true} timeout={3000}>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}
                >
                  Узнайте больше о нас
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                  Посетите наши другие страницы, чтобы узнать больше о нашем
                  сервисе:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 3,
                    flexWrap: 'wrap',
                  }}
                >
                  <MuiLink
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    sx={{ fontSize: '1.1rem' }}
                  >
                    Главная
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/challenges"
                    underline="hover"
                    sx={{ fontSize: '1.1rem' }}
                  >
                    Челленджи
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/login"
                    underline="hover"
                    sx={{ fontSize: '1.1rem' }}
                  >
                    Войти
                  </MuiLink>
                  <MuiLink
                    component={RouterLink}
                    to="/profile"
                    underline="hover"
                    sx={{ fontSize: '1.1rem' }}
                  >
                    Профиль
                  </MuiLink>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 3, fontSize: '0.9rem' }}
                >
                  © {new Date().getFullYear()} ChallengeHub. Все права защищены.
                </Typography>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;

