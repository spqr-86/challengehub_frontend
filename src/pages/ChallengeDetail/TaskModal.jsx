// src/pages/ChallengeDetail/NaskModal.jsx
// ✅ Внешние библиотеки
import React from 'react';
import PropTypes from 'prop-types';

// ✅ Компоненты Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

// ✅ Иконки Material-UI
import TaskAltIcon from '@mui/icons-material/TaskAlt';

/**
 * Модальное окно для отображения деталей задачи
 *
 * @param {Object} props
 * @param {Object} props.task - Объект задачи
 * @param {Function} props.onClose - Функция закрытия окна
 */
function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <Dialog open={Boolean(task)} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TaskAltIcon color="primary" sx={{ mr: 1 }} />
          {task.title}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" paragraph>
          {task.content}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ✅ Добавляем PropTypes для валидации пропсов
TaskModal.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;

