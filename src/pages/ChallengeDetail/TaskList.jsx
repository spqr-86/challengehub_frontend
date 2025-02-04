// src/pages/ChallengeDetail/TaskList.jsx
// ✅ Внешние библиотеки
import React from 'react';
import PropTypes from 'prop-types';

// ✅ Компоненты Material-UI
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';

// ✅ Иконки Material-UI
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Компонент списка задач
 *
 * @param {Object} props
 * @param {Array} props.tasks - Список задач
 * @param {number} props.currentTaskIndex - Индекс текущей задачи
 * @param {Function} props.onTaskSelect - Функция выбора задачи
 * @param {Function} props.onTaskComplete - Функция завершения задачи
 * @param {Function} props.onTaskDelete - Функция удаления задачи
 * @param {boolean} props.isAuthor - Флаг, является ли пользователь автором
 */
function TaskList({ tasks, currentTaskIndex, 
  onTaskSelect, onTaskComplete, onTaskDelete, isAuthor }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Все задания
        </Typography>

        <List disablePadding>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem
                component="div"
                onClick={() => onTaskSelect(task)}
                sx={{
                  cursor: 'pointer',
                  transition: '0.3s',
                  bgcolor: 
                    index === currentTaskIndex ? 'primary.light' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemText primary={`День ${index + 1}: ${task.title}`} />

                <ListItemSecondaryAction>
                  {/* ✅ Кнопка завершения задачи */}
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskComplete(task.taskProgressId);
                    }}
                    color={task.completed ? 'success' : 'default'}
                  >
                    {task.completed ? <CheckCircleIcon fontSize="large" /> : 
                    <RadioButtonUncheckedIcon fontSize="large" />}
                  </IconButton>

                  {/* ✅ Кнопка удаления задачи (только для автора) */}
                  {isAuthor && (
                    <IconButton 
                      edge="end" color="error" 
                      onClick={() => onTaskDelete(task.taskId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>

              {index < tasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

// ✅ Добавляем PropTypes для валидации пропсов
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      taskProgressId: PropTypes.number.isRequired,
      taskId: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentTaskIndex: PropTypes.number.isRequired,
  onTaskSelect: PropTypes.func.isRequired,
  onTaskComplete: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  isAuthor: PropTypes.bool.isRequired,
};

export default TaskList;

