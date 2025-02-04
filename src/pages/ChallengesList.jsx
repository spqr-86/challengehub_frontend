// src/pages/ChallengesList.jsx
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { getChallenges, joinChallenge } from '../api/challenges';
import debounce from 'lodash.debounce';
import ChallengeCard from '../components/ChallengeCard';

function ChallengesList() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningIds, setJoiningIds] = useState(new Set());
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);

  // Делаем функцию поиска + задержку (debounce)
  const fetchChallengesDebounced = useCallback(
    debounce(async (query) => {
      try {
        const data = await getChallenges(query);
        setChallenges(data);
      } catch (error) {
        enqueueSnackbar('Ошибка загрузки челленджей', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }, 500),
    [enqueueSnackbar]
  );

  useEffect(() => {
    // Если нет accessToken - ругаемся
    if (!accessToken) {
      enqueueSnackbar('Требуется авторизация', { variant: 'warning' });
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchChallengesDebounced(searchQuery);
  }, [accessToken, searchQuery, enqueueSnackbar, fetchChallengesDebounced]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAction = async (challenge) => {
    if (!accessToken) {
      enqueueSnackbar('Для участия необходимо войти', { variant: 'warning' });
      return;
    }
    try {
      setJoiningIds((prev) => new Set([...prev, challenge.id]));

      if (challenge.is_participating) {
        // Идём на детальную страницу
        navigate(`/challenge/${challenge.id}`);
      } else {
        // Присоединяемся к челленджу
        await joinChallenge(challenge.id);
        // Обновляем локально
        setChallenges((prev) =>
          prev.map((c) =>
            c.id === challenge.id
              ? {
                  ...c,
                  is_participating: true,
                  participants_count: c.participants_count + 1,
                }
              : c
          )
        );
        enqueueSnackbar('Вы успешно подписались на челлендж!', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Ошибка операции', { variant: 'error' });
    } finally {
      setJoiningIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(challenge.id);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Каталог челленджей
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          variant="outlined"
          label="Поиск челленджа"
          placeholder="Название, автор или описание..."
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      <Grid container spacing={3}>
        {challenges.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              {searchQuery
                ? `Ничего не найдено по запросу "${searchQuery}"`
                : 'Челленджей пока нет'}
            </Typography>
          </Grid>
        ) : (
          challenges.map((challenge) => (
            <Grid item xs={12} sm={6} md={4} key={challenge.id}>
              <ChallengeCard
                challenge={challenge}
                joining={joiningIds.has(challenge.id)}
                onAction={handleAction}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default ChallengesList;
