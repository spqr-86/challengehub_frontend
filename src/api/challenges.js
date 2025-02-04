// src/api/challenges.js
// ✅ Внешние библиотеки
import api from './index'; // Общий axios-инстанс

/**
 * Получить список челленджей.
 * @param {string} [query=''] Поисковый запрос (необязательно)
 * @returns {Promise<Array>} Список челленджей
 */
export async function getChallenges(query = '') {
  try {
    const params = query ? { search: query } : {};
    const response = await api.get('/challenges/challenges/', { params });
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки челленджей:', error.response?.data || error.message);
    return { challenges: [] }; // ✅ Возвращаем пустой список при ошибке
  }
}

/**
 * Получить данные одного челленджа по ID.
 * @param {number} id - ID челленджа
 * @returns {Promise<Object>} - Данные челленджа
 */
export async function getChallenge(id) {
  try {
    const response = await api.get(`/challenges/challenges/${id}/`);
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка загрузки челленджа ${id}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Создать челлендж.
 * @param {string} title - Название челленджа
 * @param {string} description - Описание челленджа
 * @param {number} duration - Продолжительность (дней)
 * @param {boolean} [isActive=true] - Активен ли челлендж
 * @returns {Promise<Object>} - Данные созданного челленджа
 */
export async function createChallenge(
  title, 
  description, 
  duration, 
  isActive = true
) {
  try {
    const response = await api.post('/challenges/challenges/', {
      title,
      description,
      duration: parseInt(duration, 10),
      is_active: isActive
    });
    return response.data;
  } catch (error) {
    console.error(
      'Ошибка создания челленджа:', 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Удалить челлендж по ID.
 * @param {number} id - ID челленджа
 * @returns {Promise<void>}
 */
export async function deleteChallenge(id) {
  try {
    await api.delete(`/challenges/challenges/${id}/`);
  } catch (error) {
    console.error(
      `Ошибка удаления челленджа ${id}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Присоединиться к челленджу.
 * @param {number} id - ID челленджа
 * @returns {Promise<Object>} - Ответ сервера
 */
export async function joinChallenge(id) {
  try {
    const response = await api.post(`/challenges/challenges/${id}/join/`);
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка присоединения к челленджу ${id}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Получает прогресс пользователя по задачам челленджа.
 * @param {number} challengeId - ID челленджа
 * @returns {Promise<Array>} - Список задач с прогрессом
 */
export async function getTaskProgress(challengeId) {
  if (!challengeId) throw new Error("challengeId is undefined");

  try {
    const response = await api.get('challenges/task-progress/', {
      params: { challenge: challengeId }
    });
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка загрузки прогресса челленджа ${challengeId}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Отмечает задачу как выполненную.
 * @param {number} taskProgressId - ID прогресса задачи
 * @returns {Promise<Object>} - Обновлённые данные задачи
 */
export async function completeTask(taskProgressId) {
  try {
    const response = await api.post(
      `challenges/task-progress/${taskProgressId}/complete/`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка завершения задачи ${taskProgressId}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Создаёт новую задачу в челлендже.
 * @param {number} challengeId - ID челленджа
 * @param {string} title - Название задачи
 * @param {string} content - Описание задачи
 * @returns {Promise<Object>} - Созданная задача
 */
export async function createTask(challengeId, title, content) {
  try {
    const response = await api.post(
      `/challenges/challenges/${challengeId}/create_task/`, { title, content });
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка создания задачи в челлендже ${challengeId}:`, 
      error.response?.data || error.message);
    throw error;
  }
}

/**
 * Получить подробности о челлендже.
 * @param {number} id - ID челленджа
 * @returns {Promise<Object>} - Данные челленджа
 */
export async function getChallengeDetail(id) {
  try {
    const response = await api.get(`/challenges/challenges/${id}/detail/`);
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка загрузки деталей челленджа ${id}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Удалить задачу по ID.
 * @param {number} taskId - ID задачи
 * @returns {Promise<void>}
 */
export async function deleteTask(taskId) {
  try {
    await api.delete(`/challenges/tasks/${taskId}/`);
  } catch (error) {
    console.error(
      `Ошибка удаления задачи ${taskId}:`, 
      error.response?.data || error.message
    );
    throw error;
  }
}
