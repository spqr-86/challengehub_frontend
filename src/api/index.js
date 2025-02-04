// src/api/index.js
// ✅ Внешние библиотеки
import axios from 'axios';
import { refreshAccessToken } from './auth';

// ✅ Базовый URL API
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// ✅ Создаём инстанс axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * ✅ Интерсептор запроса: добавляем access-токен
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ Интерсептор ответа: если 401 - пытаемся обновить токен
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем 401 и отсутствие флага _retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          localStorage.setItem('access', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // ✅ Повторяем оригинальный запрос с обновлённым токеном
          return api(originalRequest);
        } catch (err) {
          console.error(
            'Ошибка обновления токена:', 
            err.response?.data || err.message);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

/**
 * ✅ Функция для выхода из системы и очистки токенов
 */
function handleLogout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  window.location.href = '/login'; // Перенаправляем на страницу входа
}

/**
 * ✅ Получает данные текущего пользователя
 * @returns {Promise<Object>} - Данные пользователя
 */
export async function getUserProfile() {
  try {
    const response = await api.get('/users/me/');
    return response.data;
  } catch (error) {
    console.error(
      'Ошибка загрузки профиля:', 
      error.response?.data || error.message);
    throw error;
  }
}

export default api;

