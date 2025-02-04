// src/pages/ChallengeDetail/index.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { 
  getChallengeDetail, 
  createTask, 
  deleteChallenge, 
  deleteTask,
  completeTask,
 } from '../../api/challenges';

// MUI компоненты
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  LinearProgress,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';

// MUI иконки
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// Локальные компоненты и контекст
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import { AuthContext } from '../../context/AuthContext';

function ChallengeDetail() {
  // Получаем ID челленджа и навигацию
  const { id: challengeId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Состояния
  const [challenge, setChallenge] = useState(null);
  const [taskProgressList, setTaskProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isAuthor, setIsAuthor] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", content: "" });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openTaskDeleteDialog, setOpenTaskDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

   // Открытие/закрытие модального окна для удаления челленджа
  const handleOpenDeleteDialog = () => {setOpenDeleteDialog(true);};
  const handleCloseDeleteDialog = () => {setOpenDeleteDialog(false);};

  // Открытие/закрытие модального окна для удаления задачи
  const handleOpenTaskDeleteDialog = (taskId) => {
    setTaskToDelete(taskId);
    setOpenTaskDeleteDialog(true);
  };
  const handleCloseTaskDeleteDialog = () => {
    setTaskToDelete(null);
    setOpenTaskDeleteDialog(false);
  };

  // Загрузка деталей челленджа и задач
  useEffect(() => {
    async function loadChallengeDetail() {
      try {
        const data = await getChallengeDetail(challengeId);
        setChallenge(data);

        // Приводим задачи к формату, где:
        // taskProgressId - ID записи TaskProgress (t.id)
        // taskId - ID самой задачи (t.task.id)
        // title, content - название и описание задачи из API
        // completed - статус выполнения
        const formattedTasks = data.tasks.map((task) => ({
          taskProgressId: task.task_progress_id,
          taskId: task.task_id,
          title: task.title,
          content: task.content,
          completed: task.completed,
        }));

        setTaskProgressList(formattedTasks);

        // Определяем индекс первой невыполненной задачи
        const firstUncompletedIndex = formattedTasks.findIndex(
          (t) => !t.completed
        );
        setCurrentTaskIndex(
          firstUncompletedIndex !== -1 ? firstUncompletedIndex : 0
        );

        if (user && data.author_id === user.id) {
          setIsAuthor(true);
        }
      } catch (err) {
      console.error('Ошибка загрузки челленджа:', err);
      setError(true);
      } finally {
      setLoading(false);
      }
    }

    if (user) {
      loadChallengeDetail();
    }
  }, [challengeId, user]);

  // Выбор задачи для показа в модальном окне
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  // Удаление челленджа
  const handleDeleteChallenge = async () => {
    if (!challengeId) {
      console.error("Ошибка: ID челленджа не определён!");
      return;
    }
    try {
      await deleteChallenge(challengeId);
      navigate("/list");
    } catch (error) {
      console.error("Ошибка удаления челленджа:", error);
    }
  };

  // Удаление задачи по её ID
  const handleDeleteTask = async () => {
    if (!taskToDelete) {
      console.error("Ошибка: ID задачи не определён!");
      return;
    }
    try {
      await deleteTask(taskToDelete);
      setTaskProgressList(
        (prev) => prev.filter((task) => task.taskId !== taskToDelete)
      );
      handleCloseTaskDeleteDialog();
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };

  // Отметка задачи как выполненной по taskProgressId
  const handleTaskComplete = async (taskProgressId) => {
    try {
      await completeTask(taskProgressId);
      setTaskProgressList((prev) =>
        prev.map((task) => 
          task.taskProgressId === taskProgressId ? 
          { ...task, completed: !task.completed } : task
        )
      );
      // Пересчитываем индекс текущей задачи
      const nextIndex = taskProgressList.findIndex((task) => !task.completed);
      setCurrentTaskIndex(
        nextIndex === -1 ? taskProgressList.length - 1 : nextIndex
      );
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  // Создание новой задачи
  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.content) return;

    try {
      const newTaskData = await createTask(
        challengeId, 
        newTask.title, 
        newTask.content
      );
      // Добавляем новую задачу с completed: false
      setTaskProgressList((prev) => [
        ...prev,
        {
          taskProgressId: newTaskData.task_progress_id,
          taskId: newTaskData.task_id,
          title: newTaskData.title,
          content: newTaskData.content,
          completed: false,
        },
      ]);
  
      if (taskProgressList.length === 0) {
        setCurrentTaskIndex(0);
      }
  
      setNewTask({ title: "", content: "" });
    } catch (error) {
      console.error('Ошибка создания задачи:', error);
    }
  };

  // Если данные загружаются или произошла ошибка
  if (loading) 
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
      </Container>);
  if (error) 
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Ошибка загрузки челленджа
        </Typography>
      </Container>
    );
  if (!challenge) return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" color="error">
        Челлендж не найден
      </Typography>
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Заголовок и описание челленджа */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4, 
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          {challenge.title}
        </Typography>
        {isAuthor && (
          <IconButton color="error" onClick={handleOpenDeleteDialog}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      <Typography variant="h6" color="text.secondary">
        {challenge.description}
      </Typography>

      {/* Модальное окно для подтверждения удаления челленджа */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Вы уверены, что хотите удалить этот челлендж?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleDeleteChallenge} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Блок прогресса и текущей задачи */}
      <Card sx={{ mb: 4, bgcolor: 'action.hover', p: 2 }}>
        <CardContent>
          <Typography
           variant="h5" 
           gutterBottom 
           sx={{ display: 'flex', alignItems: 'center' }}
          >
            <TaskAltIcon 
              color="primary" 
              sx={{ mr: 1, verticalAlign: 'middle'}}/
            >
            Прогресс
          </Typography>

          {/* Прогресс-бар */}
          <LinearProgress
            variant="determinate"
            value={
              taskProgressList.length > 0 
                ? Math.round(
                  (taskProgressList.filter(t => t.completed).length / 
                    taskProgressList.length) * 100
                ) 
                : 0
            }
            sx={{ height: 12, borderRadius: 5, mb: 1 }}
          />

          {/* Текст выполненных задач */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ textAlign: 'center', mb: 2 }}
          >
            {taskProgressList.length > 0
              ? `${taskProgressList.filter(t => t.completed).length} 
              из ${taskProgressList.length} задач выполнено`
              : "Нет заданий"}
          </Typography>

          {/* Блок текущего задания */}
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {taskProgressList.length > 0 
            && currentTaskIndex < taskProgressList.length
              ? taskProgressList[currentTaskIndex].title
              : "Нет активных заданий"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {taskProgressList.length > 0 && 
            currentTaskIndex < taskProgressList.length
              ? taskProgressList[currentTaskIndex].content || "Нет описания"
              : "Нет активных заданий"}
          </Typography>
        </CardContent>
      </Card>

      {/* Список задач */}
      <TaskList
        tasks={taskProgressList}
        currentTaskIndex={currentTaskIndex}
        onTaskSelect={handleTaskSelect}
        onTaskComplete={handleTaskComplete}
        onTaskDelete={handleOpenTaskDeleteDialog}
        isAuthor={isAuthor} // ✅ Передаём isAuthor
      />

      {/* Модальное окно для подтверждения удаления задачи */}
      <Dialog open={openTaskDeleteDialog} onClose={handleCloseTaskDeleteDialog}>
        <DialogTitle>Вы уверены, что хотите удалить эту задачу?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseTaskDeleteDialog} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleDeleteTask} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Форма создания новой задачи (только для автора) */}
      {isAuthor && (
        <Card sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Добавить задачу</Typography>
          <TextField
            fullWidth
            label="Название"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={3}
            value={newTask.content}
            onChange={(e) => setNewTask(
              { ...newTask, content: e.target.value }
            )}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCreateTask}
          >
            Создать задачу
          </Button>
        </Card>
      )}

      {/* Модальное окно для выбранной задачи */}
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </Container>
  );
};

export default ChallengeDetail;
