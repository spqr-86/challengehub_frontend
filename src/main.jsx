// src/main.jsx
// ✅ Внешние библиотеки
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// ✅ Контекст
import { AuthProvider } from './context/AuthContext';

// ✅ Главный компонент приложения
import App from './App.jsx';

// ✅ Получаем корневой элемент
const container = document.getElementById('root');
const root = createRoot(container);

// ✅ Рендерим приложение
root.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
