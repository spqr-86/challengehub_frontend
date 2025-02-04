// src/components/ChallengeCard
// ✅ Внешние библиотеки
import React from 'react';
import PropTypes from 'prop-types';

// ✅ Компоненты Material-UI
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

/**
 * Карточка челленджа
 *
 * @param {Object} props
 * @param {Object} props.challenge - Данные челленджа
 * @param {boolean} props.joining - Флаг, показывающий, идет ли процесс подписки
 * @param {Function} props.onAction - Функция обработки нажатия кнопки
 */
function ChallengeCard({ challenge, joining, onAction }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      {/* ✅ Изображение (если есть) */}
      {challenge.image && (
        <CardMedia
          component="img"
          height="160"
          image={challenge.image}
          alt={challenge.title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          {challenge.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {challenge.description}
        </Typography>

        {/* ✅ Категория и длительность */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {challenge.category && 
            <Chip label={challenge.category} 
              size="small" 
              color="primary" 
            />
          }
          <Chip 
            label={`${challenge.duration} дней`} 
            variant="outlined" size="small" 
          />
        </Stack>

        {/* ✅ Статус участия */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={
              challenge.is_participating ? 'Вы участвуете' : 'Присоединиться'}
            color={challenge.is_participating ? 'success' : 'default'}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            {challenge.participants_count} участников
          </Typography>
        </Box>
      </CardContent>

      {/* ✅ Действия */}
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button
          size="small"
          variant={challenge.is_participating ? 'outlined' : 'contained'}
          color={challenge.is_participating ? 'secondary' : 'primary'}
          disabled={joining}
          onClick={() => onAction(challenge)}
          startIcon={joining && <CircularProgress size={20} />}
        >
          {challenge.is_participating ? 'Перейти к челленджу' : 'Подписаться'}
        </Button>
      </CardActions>
    </Card>
  );
}

// ✅ Добавляем PropTypes для валидации пропсов
ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    duration: PropTypes.number.isRequired,
    image: PropTypes.string,
    is_participating: PropTypes.bool.isRequired,
    participants_count: PropTypes.number.isRequired,
  }).isRequired,
  joining: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ChallengeCard;

