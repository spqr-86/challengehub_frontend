// src/api/auth.js
// ✅ Внешние библиотеки
import axios from 'axios';

// ✅ Базовый URL API
const API_BASE = 'http://127.0.0.1:8000/api';

/**
 * Функция для логина пользователя
 * @param {string} username - Имя пользователя
 * @param {string} password - Пароль
 * @returns {Promise<{access: string, refresh: string}>} - Возвращает access и refresh токены
 */
export async function loginUser(username, password) {
  try {
    const response = await axios.post(
      `${API_BASE}/token/`, 
      { username, password }
    );
    return response.data; // ✅ Возвращает { access, refresh }
  } catch (error) {
    console.error('Ошибка авторизации:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Функция для регистрации пользователя
 * @param {string} username - Имя пользователя
 * @param {string} email - Email
 * @param {string} password - Пароль
 * @returns {Promise<{access: string, refresh: string}>}
 */
export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(`${API_BASE}/users/register/`, {
      username,
      email,
      password,
    });
    return response.data; // Предполагается, что возвращается { access, refresh }
  } catch (error) {
    console.error('Ошибка регистрации:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Функция для обновления access-токена
 * @param {string} refreshToken - Текущий refresh-токен
 * @returns {Promise<string>} - Возвращает новый access-токен
 */
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(
      `${API_BASE}/token/refresh/`, { refresh: refreshToken }
    );
    return response.data.access; // ✅ Возвращает новый access токен
  } catch (error) {
    console.error(
      'Ошибка при обновлении токена:', error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Функция для выхода из системы
 * @param {string} refreshToken - Текущий refresh-токен
 * @returns {Promise<void>}
 */
export async function logoutUser(refreshToken) {
  try {
    await axios.post(`${API_BASE}/token/logout/`, { refresh: refreshToken });
  } catch (error) {
    console.error('Ошибка при логауте:', 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Функция для получения данных текущего пользователя
 * @returns {Promise<{id: number, username: string, email: string}>}
 */
export async function getUserProfile() {
  try {
    const response = await axios.get(`${API_BASE}/users/me/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    });
    return response.data; // ✅ Возвращает { id, username, email }
  } catch (error) {
    console.error(
      'Ошибка загрузки профиля пользователя:', 
      error.response?.data || error.message
    );
    throw error;
  }
}
