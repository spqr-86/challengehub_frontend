// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { refreshAccessToken } from '../api/auth';
import { getUserProfile } from '../api/index'; // Функция для получения данных пользователя

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem('access') || ''
  );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem('refresh') || ''
  );
  const [user, setUser] = useState(null); // ✅ Добавляем user в контекст

  // Загружаем данные пользователя
  useEffect(() => {
    async function fetchUser() {
      if (accessToken) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error('Ошибка загрузки пользователя:', error);
          setUser(null);
        }
      }
    }
    fetchUser();
  }, [accessToken]);

  // Автоматическое обновление токена
  useEffect(() => {
    const interval = setInterval(async () => {
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          setAccessToken(newAccessToken);
          localStorage.setItem('access', newAccessToken);
        } catch (error) {
          console.error('Ошибка при обновлении токена:', error);
          setAccessToken('');
          setRefreshToken('');
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setUser(null);
        }
      }
    }, 15 * 60 * 1000); // Обновляем токен каждые 15 минут

    return () => clearInterval(interval); // Очищаем таймер
  }, [refreshToken]);

  // Функция логина
  function login(access, refresh) {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    
    getUserProfile().then(setUser).catch(() => setUser(null)); // Загружаем профиль пользователя
  }

  // Функция логаута
  function logout() {
    setAccessToken('');
    setRefreshToken('');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

